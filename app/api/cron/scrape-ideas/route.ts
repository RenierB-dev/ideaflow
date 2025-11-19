import { NextRequest, NextResponse } from 'next/server';
import { scrapeRedditIdeas } from '@/lib/services/reddit-scraper';
import { createClient } from '@/lib/supabase/server';

// This endpoint is called by Vercel Cron
// Runs every 6 hours to scrape new ideas from Reddit
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

    // Subreddits to scrape
    const subreddits = [
      'Entrepreneur',
      'SaaS',
      'smallbusiness',
      'startups',
      'EntrepreneurRideAlong',
      'SideProject',
    ];

    let totalIdeasScraped = 0;
    const results = [];

    // Scrape each subreddit
    for (const subreddit of subreddits) {
      try {
        const ideas = await scrapeRedditIdeas({
          subreddit,
          timeFilter: 'day',
          limit: 10,
        });

        // Save ideas to database
        for (const idea of ideas) {
          // Check if idea already exists (based on Reddit URL)
          const { data: existing } = await supabase
            .from('ideas')
            .select('id')
            .eq('reddit_url', idea.redditUrl)
            .single();

          if (!existing) {
            const { error } = await supabase
              .from('ideas')
              .insert({
                problem: idea.problem,
                description: idea.description,
                category: idea.category || 'Other',
                pain_score: idea.painScore || 5,
                validation_score: idea.validationScore || 50,
                reddit_upvotes: idea.redditUpvotes || 0,
                reddit_comments: idea.redditComments || 0,
                reddit_url: idea.redditUrl,
                market_size: idea.marketSize || 'Medium',
                competition: idea.competition || 'Medium',
              });

            if (!error) {
              totalIdeasScraped++;
            }
          }
        }

        results.push({
          subreddit,
          ideasFound: ideas.length,
          success: true,
        });

        // Rate limiting between subreddits
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Failed to scrape r/${subreddit}:`, error);
        results.push({
          subreddit,
          ideasFound: 0,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Scraping completed`,
      totalIdeasScraped,
      results,
    });
  } catch (error) {
    console.error('Scrape cron error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape ideas' },
      { status: 500 }
    );
  }
}
