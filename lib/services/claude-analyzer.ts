import Anthropic from "@anthropic-ai/sdk"
import type { AIAnalysis } from "@/lib/types"

export class ClaudeAnalyzer {
  private client: Anthropic

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    })
  }

  async analyzeIdea(
    problem: string,
    description: string | null,
    redditComments: number,
    redditUpvotes: number
  ): Promise<AIAnalysis> {
    const prompt = `You are an expert startup advisor analyzing potential business opportunities.

Analyze this problem statement and provide detailed insights:

Problem: ${problem}
${description ? `Description: ${description}` : ""}
Community Engagement: ${redditUpvotes} upvotes, ${redditComments} comments

Provide a comprehensive analysis in JSON format with the following structure:
{
  "problem": "Refined problem statement",
  "painLevel": 1-10 (how severe is this pain point),
  "targetCustomer": "Detailed description of who has this problem",
  "marketSize": "Small/Medium/Large",
  "competitionLevel": "Low/Medium/High",
  "monetizationIdeas": ["idea 1", "idea 2", "idea 3"],
  "techStack": ["tech1", "tech2", "tech3", "tech4"],
  "buildTimeEstimate": "X weeks/months for MVP",
  "keyInsights": ["insight 1", "insight 2", "insight 3"]
}

Be specific, actionable, and realistic. Focus on practical business insights.`

    try {
      const message = await this.client.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      })

      const content = message.content[0]
      if (content.type !== "text") {
        throw new Error("Unexpected response type from Claude")
      }

      // Extract JSON from the response
      const jsonMatch = content.text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("Could not parse JSON from Claude response")
      }

      const analysis = JSON.parse(jsonMatch[0]) as AIAnalysis
      return analysis
    } catch (error) {
      console.error("Error analyzing idea with Claude:", error)
      throw error
    }
  }

  async generatePitchDeck(idea: {
    problem: string
    description: string | null
    aiAnalysis: AIAnalysis | null
  }): Promise<{
    slides: Array<{
      title: string
      content: string[]
    }>
  }> {
    const prompt = `Create a 5-slide pitch deck for this startup idea:

Problem: ${idea.problem}
${idea.description ? `Description: ${idea.description}` : ""}
${
  idea.aiAnalysis
    ? `
Market Size: ${idea.aiAnalysis.marketSize}
Target Customer: ${idea.aiAnalysis.targetCustomer}
Competition: ${idea.aiAnalysis.competitionLevel}
`
    : ""
}

Generate a JSON response with this structure:
{
  "slides": [
    {
      "title": "Problem",
      "content": ["bullet point 1", "bullet point 2", "bullet point 3"]
    },
    {
      "title": "Solution",
      "content": ["bullet point 1", "bullet point 2", "bullet point 3"]
    },
    {
      "title": "Market Opportunity",
      "content": ["bullet point 1", "bullet point 2", "bullet point 3"]
    },
    {
      "title": "Competition & Advantage",
      "content": ["bullet point 1", "bullet point 2", "bullet point 3"]
    },
    {
      "title": "Next Steps",
      "content": ["bullet point 1", "bullet point 2", "bullet point 3"]
    }
  ]
}

Make it concise, compelling, and investor-ready.`

    try {
      const message = await this.client.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1500,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      })

      const content = message.content[0]
      if (content.type !== "text") {
        throw new Error("Unexpected response type from Claude")
      }

      const jsonMatch = content.text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("Could not parse JSON from Claude response")
      }

      return JSON.parse(jsonMatch[0])
    } catch (error) {
      console.error("Error generating pitch deck with Claude:", error)
      throw error
    }
  }
}
