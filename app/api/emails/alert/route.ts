import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/send';
import { IdeaAlertEmail } from '@/lib/email/templates/idea-alert';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { userId, ideaId } = await request.json();

    if (!userId || !ideaId) {
      return NextResponse.json(
        { error: 'User ID and Idea ID are required' },
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

    // Get idea details
    const { data: idea, error: ideaError } = await supabase
      .from('ideas')
      .select('*')
      .eq('id', ideaId)
      .single();

    if (ideaError || !idea) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }

    const result = await sendEmail({
      to: user.email,
      subject: `🔔 New ${idea.category} Opportunity: ${idea.problem.substring(0, 50)}...`,
      react: IdeaAlertEmail({
        userName: user.name || 'there',
        idea: {
          id: idea.id,
          problem: idea.problem,
          category: idea.category,
          painScore: idea.pain_score,
          validationScore: idea.validation_score,
          redditUpvotes: idea.reddit_upvotes,
          redditComments: idea.reddit_comments,
        },
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
      message: 'Alert email sent successfully',
    });
  } catch (error) {
    console.error('Alert email error:', error);
    return NextResponse.json(
      { error: 'Failed to send alert email' },
      { status: 500 }
    );
  }
}
