import { NextResponse } from "next/server"
import { RedditScraper } from "@/lib/services/reddit-scraper"
import { ClaudeAnalyzer } from "@/lib/services/claude-analyzer"

export async function POST(request: Request) {
  try {
    const { subreddits, timeFilter, limit } = await request.json()

    // Validate API keys
    if (!process.env.REDDIT_CLIENT_ID || !process.env.REDDIT_CLIENT_SECRET) {
      return NextResponse.json(
        { error: "Reddit API credentials not configured" },
        { status: 500 }
      )
    }

    const scraper = new RedditScraper()
    const posts = await scraper.scrapeSubreddits(subreddits, {
      timeFilter,
      limit,
    })

    // Process posts and calculate scores
    const ideas = posts.map((post) => ({
      problem: post.title,
      description: post.selftext,
      reddit_url: post.url,
      reddit_post_id: post.id,
      pain_score: scraper.calculatePainScore(post),
      validation_score: scraper.calculateValidationScore(post),
      reddit_upvotes: post.ups,
      reddit_comments: post.num_comments,
      subreddit: post.subreddit,
    }))

    return NextResponse.json({ ideas, count: ideas.length })
  } catch (error) {
    console.error("Scraping error:", error)
    return NextResponse.json(
      { error: "Failed to scrape Reddit" },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST to scrape Reddit",
    example: {
      subreddits: ["Entrepreneur", "SaaS"],
      timeFilter: "week",
      limit: 25,
    },
  })
}
