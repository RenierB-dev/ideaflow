import { NextResponse } from "next/server"
import { ClaudeAnalyzer } from "@/lib/services/claude-analyzer"

export async function POST(request: Request) {
  try {
    const { problem, description, redditComments, redditUpvotes } =
      await request.json()

    if (!problem) {
      return NextResponse.json(
        { error: "Problem statement is required" },
        { status: 400 }
      )
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Anthropic API key not configured" },
        { status: 500 }
      )
    }

    const analyzer = new ClaudeAnalyzer()
    const analysis = await analyzer.analyzeIdea(
      problem,
      description,
      redditComments || 0,
      redditUpvotes || 0
    )

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json(
      { error: "Failed to analyze idea" },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST to analyze an idea",
    example: {
      problem: "Freelancers struggle to track time",
      description: "Need automated time tracking",
      redditComments: 50,
      redditUpvotes: 200,
    },
  })
}
