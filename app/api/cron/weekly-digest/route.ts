import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email/send';
import { WeeklyDigestEmail } from '@/lib/email/templates/weekly-digest';
import { shouldSendEmail } from '@/lib/email/schedule';

// This endpoint is called by Vercel Cron
// Runs weekly on Monday at 9 AM to send weekly digests
export async function GET(request: NextRequest) {
  try {
    // Verify this is a legitimate cron request
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = await createClient();

    // Get all users who have weekly digest enabled
    const { data: users, error: usersError } = await supabase
      .from('user_email_preferences')
      .select('user_id, users(email, name)')
      .eq('weekly_digest', true);

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
        message: 'No users with weekly digest enabled',
        emailsSent: 0,
      });
    }

    // Get top ideas from the past week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { data: weeklyIdeas, error: ideasError } = await supabase
      .from('ideas')
      .select('id, problem, category, pain_score, validation_score, reddit_upvotes')
      .gte('created_at', oneWeekAgo.toISOString())
      .order('validation_score', { ascending: false })
      .limit(10);

    if (ideasError) {
      console.error('Failed to fetch ideas:', ideasError);
      return NextResponse.json(
        { error: 'Failed to fetch ideas' },
        { status: 500 }
      );
    }

    if (!weeklyIdeas || weeklyIdeas.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No ideas from the past week',
        emailsSent: 0,
      });
    }

    // Calculate week number
    const weekNumber = Math.ceil(
      (Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) /
      (7 * 24 * 60 * 60 * 1000)
    );

    // Format ideas for email template
    const formattedIdeas = weeklyIdeas.map(idea => ({
      id: idea.id,
      problem: idea.problem,
      category: idea.category,
      painScore: idea.pain_score,
      validationScore: idea.validation_score,
      redditUpvotes: idea.reddit_upvotes,
    }));

    let emailsSent = 0;

    // Send weekly digest to each user
    for (const userPref of users) {
      if (!userPref.users) continue;

      const user = Array.isArray(userPref.users) ? userPref.users[0] : userPref.users;

      try {
        await sendEmail({
          to: user.email,
          subject: `🔥 ${formattedIdeas.length} Hot Startup Ideas This Week`,
          react: WeeklyDigestEmail({
            userName: user.name || 'there',
            ideas: formattedIdeas,
            weekNumber,
          }),
        });

        emailsSent++;

        // Rate limiting: wait 100ms between emails
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to send email to ${user.email}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Weekly digest sent to ${emailsSent} users`,
      emailsSent,
      ideasIncluded: formattedIdeas.length,
      weekNumber,
    });
  } catch (error) {
    console.error('Weekly digest error:', error);
    return NextResponse.json(
      { error: 'Failed to process weekly digest' },
      { status: 500 }
    );
  }
}
