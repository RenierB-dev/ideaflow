-- =====================================================
-- IDEAFLOW REFERRAL SYSTEM
-- =====================================================
-- This migration creates the referral system tables
-- Run this in your Supabase SQL editor
-- =====================================================

-- Referral codes table
CREATE TABLE IF NOT EXISTS referral_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Indexes
  CONSTRAINT referral_codes_code_unique UNIQUE (code)
);

CREATE INDEX idx_referral_codes_user_id ON referral_codes(user_id);
CREATE INDEX idx_referral_codes_code ON referral_codes(code);

-- Referrals tracking table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  code TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, rewarded
  reward_type TEXT, -- free_month, credits, etc.
  reward_amount INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  rewarded_at TIMESTAMPTZ,

  -- Constraints
  CONSTRAINT referrals_status_check CHECK (status IN ('pending', 'completed', 'rewarded')),
  CONSTRAINT referrals_referrer_referred_different CHECK (referrer_id != referred_id)
);

CREATE INDEX idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX idx_referrals_referred_id ON referrals(referred_id);
CREATE INDEX idx_referrals_code ON referrals(code);
CREATE INDEX idx_referrals_status ON referrals(status);

-- User category preferences for targeted alerts
CREATE TABLE IF NOT EXISTS user_category_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint: user can only have one entry per category
  CONSTRAINT user_category_preferences_unique UNIQUE (user_id, category)
);

CREATE INDEX idx_user_category_preferences_user_id ON user_category_preferences(user_id);

-- Email preferences table
CREATE TABLE IF NOT EXISTS user_email_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  weekly_digest BOOLEAN DEFAULT true,
  idea_alerts BOOLEAN DEFAULT true,
  marketing BOOLEAN DEFAULT true,
  product_updates BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint: one preference set per user
  CONSTRAINT user_email_preferences_unique UNIQUE (user_id)
);

CREATE INDEX idx_user_email_preferences_user_id ON user_email_preferences(user_id);

-- Email queue for scheduled emails
CREATE TABLE IF NOT EXISTS email_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL, -- welcome, digest, alert, upgrade, payment
  subject TEXT,
  data JSONB, -- Template data
  status TEXT NOT NULL DEFAULT 'pending', -- pending, sent, failed
  scheduled_for TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT email_queue_status_check CHECK (status IN ('pending', 'sent', 'failed'))
);

CREATE INDEX idx_email_queue_user_id ON email_queue(user_id);
CREATE INDEX idx_email_queue_status ON email_queue(status);
CREATE INDEX idx_email_queue_scheduled_for ON email_queue(scheduled_for);

-- User stats tracking
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ideas_viewed INTEGER DEFAULT 0,
  ideas_saved INTEGER DEFAULT 0,
  analyses_viewed INTEGER DEFAULT 0,
  referrals_sent INTEGER DEFAULT 0,
  referrals_completed INTEGER DEFAULT 0,
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint: one stats record per user
  CONSTRAINT user_stats_unique UNIQUE (user_id)
);

CREATE INDEX idx_user_stats_user_id ON user_stats(user_id);

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    -- Generate 8-character alphanumeric code
    code := upper(substring(md5(random()::text) from 1 for 8));

    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM referral_codes WHERE referral_codes.code = code) INTO exists;

    EXIT WHEN NOT exists;
  END LOOP;

  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Function to create referral code for new users
CREATE OR REPLACE FUNCTION create_user_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO referral_codes (user_id, code)
  VALUES (NEW.id, generate_referral_code());

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-create referral code when user signs up
CREATE TRIGGER trigger_create_referral_code
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_referral_code();

-- Function to update referral status
CREATE OR REPLACE FUNCTION update_referral_status()
RETURNS TRIGGER AS $$
BEGIN
  -- When a referred user signs up, mark referral as completed
  IF TG_OP = 'INSERT' THEN
    UPDATE referrals
    SET
      status = 'completed',
      referred_id = NEW.id,
      completed_at = NOW()
    WHERE
      code = (SELECT raw_user_meta_data->>'referral_code' FROM auth.users WHERE id = NEW.id)
      AND status = 'pending';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_category_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_email_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Referral codes policies
CREATE POLICY "Users can view their own referral codes"
  ON referral_codes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own referral codes"
  ON referral_codes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Referrals policies
CREATE POLICY "Users can view their own referrals"
  ON referrals FOR SELECT
  USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

CREATE POLICY "Users can insert referrals"
  ON referrals FOR INSERT
  WITH CHECK (auth.uid() = referrer_id);

-- User category preferences policies
CREATE POLICY "Users can manage their own category preferences"
  ON user_category_preferences FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Email preferences policies
CREATE POLICY "Users can manage their own email preferences"
  ON user_email_preferences FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Email queue policies (admin only)
CREATE POLICY "Only system can manage email queue"
  ON email_queue FOR ALL
  USING (false)
  WITH CHECK (false);

-- User stats policies
CREATE POLICY "Users can view their own stats"
  ON user_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats"
  ON user_stats FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON referral_codes TO authenticated;
GRANT ALL ON referrals TO authenticated;
GRANT ALL ON user_category_preferences TO authenticated;
GRANT ALL ON user_email_preferences TO authenticated;
GRANT ALL ON user_stats TO authenticated;

-- Comments
COMMENT ON TABLE referral_codes IS 'Stores unique referral codes for each user';
COMMENT ON TABLE referrals IS 'Tracks referral relationships and rewards';
COMMENT ON TABLE user_category_preferences IS 'User preferences for idea categories';
COMMENT ON TABLE user_email_preferences IS 'User email notification preferences';
COMMENT ON TABLE email_queue IS 'Queue for scheduled email delivery';
COMMENT ON TABLE user_stats IS 'Tracks user activity and engagement metrics';
