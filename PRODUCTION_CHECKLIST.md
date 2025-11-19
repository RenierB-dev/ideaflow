# 🚀 IdeaFlow Production Launch Checklist

This comprehensive checklist ensures your IdeaFlow platform is production-ready before going live.

---

## 📋 Pre-Launch Checklist

### 1. Environment Configuration

#### ✅ Vercel Setup
- [ ] Create Vercel project and connect repository
- [ ] Configure custom domain (Settings → Domains)
- [ ] Set all environment variables in Vercel dashboard
- [ ] Enable automatic deployments from main branch
- [ ] Test preview deployments work correctly

#### ✅ Environment Variables (Vercel Dashboard)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Service role key (keep secret!)
- [ ] `ANTHROPIC_API_KEY` - Claude AI API key
- [ ] `REDDIT_CLIENT_ID` - Reddit app client ID
- [ ] `REDDIT_CLIENT_SECRET` - Reddit app secret
- [ ] `REDDIT_USER_AGENT` - Set to "IdeaFlow/1.0.0"
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key
- [ ] `STRIPE_SECRET_KEY` - Stripe secret key
- [ ] `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- [ ] `STRIPE_PRO_PRICE_ID` - Pro subscription price ID
- [ ] `RESEND_API_KEY` - Resend email API key
- [ ] `EMAIL_FROM` - Verified sender email
- [ ] `NEXT_PUBLIC_POSTHOG_KEY` - PostHog project key
- [ ] `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host URL
- [ ] `NEXT_PUBLIC_APP_URL` - Production domain URL
- [ ] `CRON_SECRET` - Random secret for cron job auth
- [ ] `ADMIN_USER_IDS` - Comma-separated admin user UUIDs

---

### 2. Database (Supabase)

#### ✅ Schema Migration
- [ ] Run initial schema migration (`lib/supabase/schema.sql`)
- [ ] Run referral system migration (`lib/supabase/migrations/002_referral_system.sql`)
- [ ] Verify all tables are created
- [ ] Check Row Level Security (RLS) policies are enabled
- [ ] Test database connections from Vercel

#### ✅ Required Tables
- [ ] `ideas` - Startup ideas from Reddit
- [ ] `users` - User accounts (managed by Supabase Auth)
- [ ] `user_stats` - User activity tracking
- [ ] `referral_codes` - User referral codes
- [ ] `referrals` - Referral tracking
- [ ] `user_category_preferences` - Category preferences
- [ ] `user_email_preferences` - Email notification settings
- [ ] `email_queue` - Scheduled email queue

#### ✅ Indexes
- [ ] Verify all indexes are created for optimal performance
- [ ] Test query performance on large datasets

---

### 3. Third-Party Services

#### ✅ Anthropic (Claude AI)
- [ ] Create account at https://console.anthropic.com/
- [ ] Generate API key
- [ ] Set spending limits (optional)
- [ ] Test API connection with sample request
- [ ] Monitor usage and costs

#### ✅ Reddit API
- [ ] Create Reddit app at https://www.reddit.com/prefs/apps
- [ ] App type: **Script**
- [ ] Set redirect URI: `http://localhost:3000` (doesn't matter for script apps)
- [ ] Copy client ID and secret
- [ ] Test scraping functionality
- [ ] Monitor rate limits (60 requests/minute)

#### ✅ Stripe (Payments)
- [ ] Create Stripe account
- [ ] Switch to **Live mode** (not Test mode)
- [ ] Create "IdeaFlow Pro" product
- [ ] Set price: $19/month recurring
- [ ] Copy Price ID to environment variables
- [ ] Create webhook endpoint:
  - URL: `https://yourdomain.com/api/webhooks/stripe`
  - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- [ ] Copy webhook signing secret
- [ ] Test checkout flow end-to-end
- [ ] Verify webhooks are being received

#### ✅ Resend (Email)
- [ ] Create account at https://resend.com
- [ ] Add and verify your sending domain
- [ ] Create API key
- [ ] Test sending welcome email
- [ ] Monitor email delivery rates
- [ ] Set up SPF/DKIM records for domain

#### ✅ PostHog (Analytics)
- [ ] Create account at https://app.posthog.com
- [ ] Create new project
- [ ] Copy Project API Key
- [ ] Test event tracking
- [ ] Set up custom dashboards
- [ ] Configure feature flags (optional)

---

### 4. Cron Jobs (Vercel)

#### ✅ Scheduled Tasks
All cron jobs are defined in `vercel.json`:

- [ ] **Daily Digest** - Runs daily at 9 AM
  - Path: `/api/cron/daily-digest`
  - Test endpoint manually first

- [ ] **Weekly Digest** - Runs Mondays at 9 AM
  - Path: `/api/cron/weekly-digest`
  - Test with sample users

- [ ] **Scrape Ideas** - Runs every 6 hours
  - Path: `/api/cron/scrape-ideas`
  - Verify Reddit API credentials work

- [ ] Generate `CRON_SECRET` environment variable
- [ ] Test each cron endpoint with Bearer token auth
- [ ] Monitor cron job logs in Vercel dashboard

---

### 5. Email System

#### ✅ Email Templates
- [ ] Test welcome email rendering
- [ ] Test weekly digest email
- [ ] Test idea alert email
- [ ] Test upgrade prompt email
- [ ] Test payment success email
- [ ] Verify all links work correctly
- [ ] Test on multiple email clients (Gmail, Outlook, Apple Mail)
- [ ] Check mobile responsiveness

#### ✅ Email Delivery
- [ ] Send test emails to yourself
- [ ] Check spam folder
- [ ] Verify sender name and address
- [ ] Test unsubscribe links
- [ ] Monitor bounce rates
- [ ] Set up email notifications for failures

---

### 6. Features & Functionality

#### ✅ Core Features
- [ ] Homepage loads correctly
- [ ] Ideas grid displays properly
- [ ] Filter by category works
- [ ] Sort options function
- [ ] Search functionality works
- [ ] Idea detail modal opens
- [ ] AI analysis displays (Pro users)
- [ ] Dark/light mode toggle works

#### ✅ Authentication
- [ ] Sign up flow works
- [ ] Email verification works (if enabled)
- [ ] Login works
- [ ] Logout works
- [ ] Password reset works
- [ ] Session persistence works

#### ✅ Subscription (Stripe)
- [ ] Free tier limitations enforced
- [ ] Pro upgrade flow works
- [ ] Payment succeeds
- [ ] Subscription activated immediately
- [ ] Pro features unlock
- [ ] Billing portal accessible
- [ ] Cancellation works
- [ ] Webhook handles subscription updates

#### ✅ Referral System
- [ ] Referral code generated for new users
- [ ] Referral page displays correctly
- [ ] Share links work
- [ ] Tracking works when using referral links
- [ ] Rewards are applied correctly

#### ✅ Analytics
- [ ] PostHog tracking events
- [ ] Page views tracked
- [ ] User actions tracked
- [ ] Conversion funnel works
- [ ] Custom properties set

#### ✅ Admin Dashboard
- [ ] Admin users can access `/admin`
- [ ] User management works
- [ ] Idea management works
- [ ] Analytics charts display
- [ ] Feature/unfeature ideas works

---

### 7. Performance & SEO

#### ✅ Performance
- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Optimize images (use Next.js Image component)
- [ ] Enable caching headers
- [ ] Test loading speed
- [ ] Minimize bundle size
- [ ] Enable compression

#### ✅ SEO
- [ ] Set meta titles and descriptions
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Create `robots.txt`
- [ ] Create `sitemap.xml`
- [ ] Add schema.org markup
- [ ] Test with Google Search Console

---

### 8. Security

#### ✅ Security Checklist
- [ ] All API keys in environment variables (not in code)
- [ ] Row Level Security (RLS) enabled on all Supabase tables
- [ ] HTTPS enforced (automatic with Vercel)
- [ ] CORS configured correctly
- [ ] Rate limiting implemented on API routes
- [ ] Input validation on all forms
- [ ] XSS protection enabled
- [ ] CSRF protection enabled
- [ ] Secrets not exposed in client-side code
- [ ] Admin routes protected
- [ ] Cron endpoints require auth token

---

### 9. Legal & Compliance

#### ✅ Legal Pages
- [ ] Privacy Policy created and linked
- [ ] Terms of Service created and linked
- [ ] Cookie consent banner (if needed for GDPR)
- [ ] Refund policy documented
- [ ] Contact information visible

#### ✅ GDPR Compliance (if targeting EU)
- [ ] Cookie consent mechanism
- [ ] Data export functionality
- [ ] Data deletion functionality
- [ ] Privacy policy updated
- [ ] User data processing documented

---

### 10. Monitoring & Logging

#### ✅ Error Tracking
- [ ] Set up error tracking (Sentry recommended)
- [ ] Test error notifications
- [ ] Set up alerts for critical errors

#### ✅ Monitoring
- [ ] Vercel Analytics enabled
- [ ] Monitor API response times
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Monitor Stripe webhook delivery
- [ ] Monitor email delivery rates
- [ ] Track Reddit API rate limits

#### ✅ Logging
- [ ] Server-side errors logged
- [ ] Stripe events logged
- [ ] Email send failures logged
- [ ] Cron job execution logged

---

### 11. Testing

#### ✅ Manual Testing
- [ ] Test full user journey (signup → browse → upgrade)
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on mobile devices
- [ ] Test all payment flows
- [ ] Test all email flows
- [ ] Test referral flow

#### ✅ Edge Cases
- [ ] Test with no ideas in database
- [ ] Test with thousands of ideas
- [ ] Test with slow network
- [ ] Test with disabled JavaScript
- [ ] Test expired sessions
- [ ] Test failed payments
- [ ] Test API errors

---

### 12. Content & Communication

#### ✅ Initial Content
- [ ] Seed database with 20-50 quality ideas
- [ ] Verify AI analysis quality
- [ ] Check for duplicate ideas
- [ ] Categorize ideas correctly

#### ✅ Communication
- [ ] Prepare launch announcement
- [ ] Set up social media accounts
- [ ] Prepare support email templates
- [ ] Create FAQ page
- [ ] Set up customer support channel

---

### 13. Backup & Recovery

#### ✅ Backups
- [ ] Enable Supabase automatic backups
- [ ] Document database backup process
- [ ] Test database restore process
- [ ] Backup environment variables
- [ ] Document recovery procedures

---

### 14. Final Checks

#### ✅ Pre-Launch
- [ ] Review all checklist items above
- [ ] Run final end-to-end test
- [ ] Check all external links
- [ ] Verify custom domain SSL
- [ ] Test contact forms
- [ ] Clear test data from production database
- [ ] Take production database snapshot

#### ✅ Launch Day
- [ ] Deploy to production
- [ ] Monitor error logs closely
- [ ] Test live site immediately
- [ ] Monitor analytics
- [ ] Be ready for support requests

#### ✅ Post-Launch
- [ ] Monitor first 24 hours closely
- [ ] Check email delivery
- [ ] Verify payments working
- [ ] Monitor server performance
- [ ] Collect user feedback
- [ ] Fix critical bugs immediately

---

## 🎯 Success Metrics to Track

- Daily active users
- Weekly signups
- Pro conversion rate
- MRR (Monthly Recurring Revenue)
- Churn rate
- Referral rate
- Average session duration
- Email open rates
- Most popular categories
- Top performing ideas

---

## 🆘 Emergency Contacts

- **Vercel Support**: https://vercel.com/support
- **Supabase Support**: https://supabase.com/support
- **Stripe Support**: https://support.stripe.com
- **Resend Support**: support@resend.com

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [PostHog Documentation](https://posthog.com/docs)

---

**Good luck with your launch! 🚀**
