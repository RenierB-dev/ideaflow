-- IdeaFlow Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ideas table
CREATE TABLE ideas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  problem TEXT NOT NULL,
  description TEXT,
  reddit_url TEXT,
  reddit_post_id TEXT UNIQUE,
  category_id UUID REFERENCES categories(id),

  -- Scores
  pain_score INTEGER CHECK (pain_score >= 1 AND pain_score <= 10),
  validation_score INTEGER DEFAULT 0,
  upvotes INTEGER DEFAULT 0,
  reddit_upvotes INTEGER DEFAULT 0,
  reddit_comments INTEGER DEFAULT 0,

  -- AI Analysis (JSON)
  ai_analysis JSONB,
  market_size TEXT CHECK (market_size IN ('Small', 'Medium', 'Large')),
  competition_level TEXT CHECK (competition_level IN ('Low', 'Medium', 'High')),

  -- Metadata
  analyzed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User saved ideas table
CREATE TABLE user_saved_ideas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, idea_id)
);

-- User votes table
CREATE TABLE user_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE,
  vote INTEGER CHECK (vote IN (-1, 1)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, idea_id)
);

-- User subscriptions table (for Stripe)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT CHECK (plan IN ('free', 'pro')),
  status TEXT,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, color) VALUES
  ('SaaS', '#3B82F6'),
  ('E-commerce', '#10B981'),
  ('Productivity', '#8B5CF6'),
  ('Health & Fitness', '#EF4444'),
  ('Education', '#F59E0B'),
  ('Finance', '#06B6D4'),
  ('Marketing', '#EC4899'),
  ('Developer Tools', '#6366F1'),
  ('Other', '#6B7280');

-- Create indexes for better query performance
CREATE INDEX idx_ideas_category ON ideas(category_id);
CREATE INDEX idx_ideas_pain_score ON ideas(pain_score DESC);
CREATE INDEX idx_ideas_validation_score ON ideas(validation_score DESC);
CREATE INDEX idx_ideas_created_at ON ideas(created_at DESC);
CREATE INDEX idx_user_saved_ideas_user ON user_saved_ideas(user_id);
CREATE INDEX idx_user_votes_user ON user_votes(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for ideas table
CREATE TRIGGER update_ideas_updated_at BEFORE UPDATE ON ideas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for subscriptions table
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_saved_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ideas (public read, admin write)
CREATE POLICY "Ideas are viewable by everyone" ON ideas
  FOR SELECT USING (true);

CREATE POLICY "Ideas can be inserted by authenticated users" ON ideas
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Ideas can be updated by authenticated users" ON ideas
  FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS Policies for user_saved_ideas
CREATE POLICY "Users can view their own saved ideas" ON user_saved_ideas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save ideas" ON user_saved_ideas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave their ideas" ON user_saved_ideas
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user_votes
CREATE POLICY "Users can view their own votes" ON user_votes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create votes" ON user_votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their votes" ON user_votes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their votes" ON user_votes
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for subscriptions
CREATE POLICY "Users can view their own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);
