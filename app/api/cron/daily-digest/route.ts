import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email/send';
import { IdeaAlertEmail } from '@/lib/email/templates/idea-alert';
import { shouldSendEmail } from '@/lib/email/schedule';

// This endpoint is called by Vercel Cron
// Runs daily at 9 AM to send idea alerts to users
export async function GET(request: NextRequest) {
  try {
    // Verify this is a legitimate cron request (Vercel adds this header)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = await createClient();

    // Get all users who have idea alerts enabled
    const { data: users, error: usersError } = await supabase
      .from('user_email_preferences')
      .select('user_id, users(email, name)')
      .eq('idea_alerts', true);

    if (usersError) {
      console.error('Failed to fetch users:', usersError);
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      );
    }

    if (!users || users.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No users with alerts enabled',
        emailsSent: 0,
      });
    }

    // Get new ideas from the past 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { data: newIdeas, error: ideasError } = await supabase
      .from('ideas')
      .select('*')
      .gte('created_at', yesterday.toISOString())
      .gte('pain_score', 7) // Only send high-pain ideas
      .order('validation_score', { ascending: false });

    if (ideasError) {
      console.error('Failed to fetch ideas:', ideasError);
      return NextResponse.json(
        { error: 'Failed to fetch ideas' },
        { status: 500 }
      );
    }

    if (!newIdeas || newIdeas.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No new high-pain ideas to send',
        emailsSent: 0,
      });
    }

    let emailsSent = 0;

    // Send alerts for each user based on their category preferences
    for (const userPref of users) {
      if (!userPref.users) continue;

      const user = Array.isArray(userPref.users) ? userPref.users[0] : userPref.users;

      // Get user's favorite categories
      const { data: categoryPrefs } = await supabase
        .from('user_category_preferences')
        .select('category')
        .eq('user_id', userPref.user_id);

      const favoriteCategories = categoryPrefs?.map(p => p.category) || [];

      // Filter ideas by user's favorite categories (or send all if no preferences)
      const relevantIdeas = favoriteCategories.length > 0
        ? newIdeas.filter(idea => favoriteCategories.includes(idea.category))
        : newIdeas;

      // Send alert for the top idea
      if (relevantIdeas.length > 0) {
        const topIdea = relevantIdeas[0];

        try {
          await sendEmail({
            to: user.email,
            subject: `🔔 New ${topIdea.category} Opportunity: ${topIdea.problem.substring(0, 50)}...`,
            react: IdeaAlertEmail({
              userName: user.name || 'there',
              idea: {
                id: topIdea.id,
                problem: topIdea.problem,
                category: topIdea.category,
                painScore: topIdea.pain_score,
                validationScore: topIdea.validation_score,
                redditUpvotes: topIdea.reddit_upvotes,
                redditComments: topIdea.reddit_comments,
              },
            }),
          });

          emailsSent++;

          // Rate limiting: wait 100ms between emails
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Failed to send email to ${user.email}:`, error);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Daily digest completed`,
      emailsSent,
      newIdeas: newIdeas.length,
      usersChecked: users.length,
    });
  } catch (error) {
    console.error('Daily digest error:', error);
    return NextResponse.json(
      { error: 'Failed to process daily digest' },
      { status: 500 }
    );
  }
}
