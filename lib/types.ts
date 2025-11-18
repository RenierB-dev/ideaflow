export interface Category {
  id: string
  name: string
  color: string
  created_at: string
}

export interface AIAnalysis {
  problem: string
  painLevel: number
  targetCustomer: string
  marketSize: 'Small' | 'Medium' | 'Large'
  competitionLevel: 'Low' | 'Medium' | 'High'
  monetizationIdeas: string[]
  techStack: string[]
  buildTimeEstimate: string
  keyInsights: string[]
}

export interface Idea {
  id: string
  problem: string
  description: string | null
  reddit_url: string | null
  reddit_post_id: string | null
  category_id: string | null
  category?: Category
  pain_score: number
  validation_score: number
  upvotes: number
  reddit_upvotes: number
  reddit_comments: number
  ai_analysis: AIAnalysis | null
  market_size: 'Small' | 'Medium' | 'Large' | null
  competition_level: 'Low' | 'Medium' | 'High' | null
  analyzed: boolean
  created_at: string
  updated_at: string
  is_saved?: boolean
  user_vote?: number
}

export interface UserSubscription {
  id: string
  user_id: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  plan: 'free' | 'pro'
  status: string | null
  current_period_end: string | null
  created_at: string
  updated_at: string
}
