import Snoowrap from "snoowrap"

export interface RedditPost {
  id: string
  title: string
  selftext: string
  url: string
  ups: number
  num_comments: number
  created_utc: number
  subreddit: string
}

export class RedditScraper {
  private reddit: Snoowrap

  constructor() {
    this.reddit = new Snoowrap({
      userAgent: process.env.REDDIT_USER_AGENT || "IdeaFlow/1.0.0",
      clientId: process.env.REDDIT_CLIENT_ID!,
      clientSecret: process.env.REDDIT_CLIENT_SECRET!,
      refreshToken: undefined,
    })
  }

  async scrapeSubreddits(
    subreddits: string[] = ["Entrepreneur", "SaaS", "smallbusiness", "startup"],
    options: {
      timeFilter?: "hour" | "day" | "week" | "month" | "year" | "all"
      limit?: number
      minUpvotes?: number
    } = {}
  ): Promise<RedditPost[]> {
    const {
      timeFilter = "week",
      limit = 25,
      minUpvotes = 10,
    } = options

    const allPosts: RedditPost[] = []

    try {
      for (const subreddit of subreddits) {
        const posts = await this.reddit
          .getSubreddit(subreddit)
          .getTop({ time: timeFilter, limit })

        for (const post of posts) {
          // Filter for problem-related posts
          const isProblemPost = this.isProblemRelated(post.title, post.selftext)

          if (
            isProblemPost &&
            post.ups >= minUpvotes &&
            post.selftext.length > 50
          ) {
            allPosts.push({
              id: post.id,
              title: post.title,
              selftext: post.selftext,
              url: `https://reddit.com${post.permalink}`,
              ups: post.ups,
              num_comments: post.num_comments,
              created_utc: post.created_utc,
              subreddit: post.subreddit.display_name,
            })
          }
        }
      }

      return allPosts
    } catch (error) {
      console.error("Error scraping Reddit:", error)
      throw error
    }
  }

  private isProblemRelated(title: string, body: string): boolean {
    const problemKeywords = [
      "problem",
      "issue",
      "struggle",
      "frustrated",
      "pain",
      "difficult",
      "hard to",
      "waste",
      "need",
      "looking for",
      "how can i",
      "how do i",
      "can't find",
      "annoying",
      "inefficient",
      "time-consuming",
      "expensive",
      "complicated",
    ]

    const text = `${title} ${body}`.toLowerCase()

    return problemKeywords.some((keyword) => text.includes(keyword))
  }

  calculatePainScore(post: RedditPost): number {
    // Algorithm to calculate pain score from 1-10
    let score = 5 // Base score

    // Engagement factor (upvotes and comments)
    const engagementScore = Math.min(
      (post.ups / 100 + post.num_comments / 20) / 2,
      3
    )
    score += engagementScore

    // Emotional language detection
    const emotionalWords = [
      "hate",
      "terrible",
      "awful",
      "frustrated",
      "angry",
      "desperate",
      "impossible",
      "nightmare",
    ]
    const text = `${post.title} ${post.selftext}`.toLowerCase()
    const emotionCount = emotionalWords.filter((word) =>
      text.includes(word)
    ).length

    score += Math.min(emotionCount * 0.5, 2)

    return Math.min(Math.max(Math.round(score), 1), 10)
  }

  calculateValidationScore(post: RedditPost): number {
    // Weighted score based on engagement
    return post.ups * 2 + post.num_comments * 3
  }
}
