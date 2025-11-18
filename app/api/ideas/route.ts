import { NextResponse } from "next/server"
import { mockIdeas } from "@/lib/mock-data"

// This is a simplified version - in production, this would query Supabase
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const sortBy = searchParams.get("sort") || "trending"
  const limit = parseInt(searchParams.get("limit") || "20")

  let ideas = [...mockIdeas]

  // Filter by category
  if (category) {
    ideas = ideas.filter(
      (idea) => idea.category?.name.toLowerCase() === category.toLowerCase()
    )
  }

  // Sort
  switch (sortBy) {
    case "trending":
      ideas.sort((a, b) => {
        const scoreA = a.validation_score + (a.upvotes + a.reddit_upvotes) * 10
        const scoreB = b.validation_score + (b.upvotes + b.reddit_upvotes) * 10
        return scoreB - scoreA
      })
      break
    case "newest":
      ideas.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      break
    case "pain":
      ideas.sort((a, b) => b.pain_score - a.pain_score)
      break
    case "validation":
      ideas.sort((a, b) => b.validation_score - a.validation_score)
      break
  }

  // Limit results
  ideas = ideas.slice(0, limit)

  return NextResponse.json({ ideas, count: ideas.length })
}
