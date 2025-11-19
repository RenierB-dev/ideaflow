import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/send';
import { WeeklyDigestEmail } from '@/lib/email/templates/weekly-digest';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get user details
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('email, name')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get top ideas from the past week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { data: ideas, error: ideasError } = await supabase
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

    // Calculate week number
    const weekNumber = Math.ceil(
      (Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) /
      (7 * 24 * 60 * 60 * 1000)
    );

    // Format ideas for email template
    const formattedIdeas = (ideas || []).map(idea => ({
      id: idea.id,
      problem: idea.problem,
      category: idea.category,
      painScore: idea.pain_score,
      validationScore: idea.validation_score,
      redditUpvotes: idea.reddit_upvotes,
    }));

    const result = await sendEmail({
      to: user.email,
      subject: `🔥 ${formattedIdeas.length} Hot Startup Ideas This Week`,
      react: WeeklyDigestEmail({
        userName: user.name || 'there',
        ideas: formattedIdeas,
        weekNumber,
      }),
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Digest email sent successfully',
      ideasCount: formattedIdeas.length,
    });
  } catch (error) {
    console.error('Digest email error:', error);
    return NextResponse.json(
      { error: 'Failed to send digest email' },
      { status: 500 }
    );
  }
}
