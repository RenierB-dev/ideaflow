'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check, Share2, Gift, Users, TrendingUp } from 'lucide-react';

export default function ReferralPage() {
  const [referralCode, setReferralCode] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    rewarded: 0,
  });
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      const response = await fetch('/api/referrals/generate');
      const data = await response.json();

      if (data.success) {
        setReferralCode(data.code);
        setStats(data.stats || stats);
      }
    } catch (error) {
      console.error('Failed to fetch referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const referralUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareMessage = `I found my startup idea on IdeaFlow - validated ideas from Reddit with AI analysis. Join me and get 1 month free: ${referralUrl}`;

  const shareOnTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
    window.open(tweetUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`;
    window.open(linkedInUrl, '_blank');
  };

  const shareViaEmail = () => {
    const subject = 'Check out IdeaFlow - Discover Validated Startup Ideas';
    const body = shareMessage;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3">
          Share IdeaFlow, Get Rewarded! 🎁
        </h1>
        <p className="text-lg text-muted-foreground">
          Invite friends and get 1 month of Pro free for each successful referral
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Referrals</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
                <Gift className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-3xl font-bold mb-1">{stats.rewarded}</div>
              <div className="text-sm text-muted-foreground">Rewards Earned</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={referralUrl}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              onClick={copyToClipboard}
              className="flex-shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground mb-3">
              Share your referral link:
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={shareOnTwitter}
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                onClick={shareOnLinkedIn}
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                onClick={shareViaEmail}
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400 font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1">Share Your Link</h3>
              <p className="text-sm text-muted-foreground">
                Send your unique referral link to friends, colleagues, or share it on social media.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-purple-600 dark:text-purple-400 font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1">They Sign Up</h3>
              <p className="text-sm text-muted-foreground">
                When someone signs up using your link, they get their first month free!
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-green-600 dark:text-green-400 font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1">You Get Rewarded</h3>
              <p className="text-sm text-muted-foreground">
                Once they subscribe to Pro, you'll receive 1 month of Pro free. Unlimited referrals!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
