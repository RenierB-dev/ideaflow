# 🚀 IdeaFlow - AI-Powered Startup Idea Discovery Platform

> Transform real problems into validated startup opportunities with AI-powered insights

IdeaFlow is a **premium, feature-rich platform** that helps indie hackers and entrepreneurs discover validated startup ideas by analyzing real problems discussed on Reddit. With beautiful Pinterest-style cards, AI-powered market analysis, and comprehensive business insights, IdeaFlow turns problem discovery into your competitive advantage.

![IdeaFlow Preview](https://img.shields.io/badge/Status-MVP%20Complete-success)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)

## ✨ Features

### 🎨 Stunning UI/UX
- **Pinterest-style card grid** with smooth animations (Framer Motion)
- **Glass morphism effects** and gradient backgrounds
- **Dark/Light mode** toggle with system preference detection
- **Responsive design** that looks great on all devices
- **Professional aesthetic** inspired by Linear, Vercel, and Stripe

### 🤖 AI-Powered Analysis
- **Claude AI integration** for deep market analysis
- **Pain score calculation** (1-10 scale with visual gauges)
- **Validation scoring** based on engagement metrics
- **Target customer identification**
- **Market size estimation** (Small/Medium/Large)
- **Competition analysis** (Low/Medium/High)
- **Monetization strategies** (3+ ideas per opportunity)
- **Tech stack recommendations**
- **Build time estimates**

### 📊 Reddit Integration
- **Automated scraping** from r/Entrepreneur, r/SaaS, r/smallbusiness, etc.
- **Real-time discovery** of problems people actually want solved
- **Engagement metrics** (upvotes, comments, recency)
- **Problem keyword detection** using NLP
- **Validation scoring algorithm**

### 🎯 Interactive Features
- **Advanced filtering** by category, pain score, market size
- **Multi-sort options** (Trending, Newest, Highest Pain, Most Validated)
- **Search functionality** (coming soon)
- **Save ideas** to personal board (Pro feature)
- **Upvote/downvote** system (coming soon)
- **Detailed idea modals** with tabbed AI analysis

### 💎 Pro Features (Planned)
- **Unlimited AI analysis** access
- **Saved idea boards** with organization
- **Email alerts** for new trending ideas
- **AI pitch deck generator** (5-slide PDF export)
- **Priority support**

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **Framer Motion** - Smooth animations
- **Lucide Icons** - Modern icon library
- **next-themes** - Dark mode support

### Backend
- **Next.js API Routes** - Serverless functions
- **Supabase** - Database, Auth, and Real-time
- **PostgreSQL** - Robust relational database
- **Row Level Security** - Data protection

### AI & APIs
- **Claude 3.5 Sonnet** - AI analysis via Anthropic
- **Reddit API (Snoowrap)** - Content scraping
- **Stripe API** - Payment processing

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works)
- Anthropic API key (for Claude AI)
- Reddit API credentials
- Stripe account (for payments)

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd ideaflow
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Claude API
ANTHROPIC_API_KEY=your_anthropic_api_key

# Reddit API
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USER_AGENT=IdeaFlow/1.0.0

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Set Up Supabase Database
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the schema from `lib/supabase/schema.sql`
4. This will create all necessary tables, indexes, and RLS policies

### Step 5: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Usage

### Viewing Ideas
The home page displays a beautiful grid of startup ideas with:
- Problem statements and pain scores
- Validation scores with progress bars
- Category badges with custom colors
- Engagement metrics (upvotes, comments)
- Market size indicators

### Filtering & Sorting
Use the filter controls to:
- **Sort** by Trending, Newest, Highest Pain, or Most Validated
- **Filter** by categories (SaaS, E-commerce, etc.)
- **Search** for specific keywords (coming soon)

### Viewing Detailed Analysis
Click "View Details" on any idea card to see:
- **Overview tab**: Problem statement and key insights
- **AI Analysis tab**: Market analysis, monetization ideas, tech stack (Pro)
- **Pitch Deck tab**: Generate investor-ready PDF (Pro)

### Scraping New Ideas (API)
```bash
# POST to /api/scrape
curl -X POST http://localhost:3000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{
    "subreddits": ["Entrepreneur", "SaaS"],
    "timeFilter": "week",
    "limit": 25
  }'
```

### Analyzing Ideas (API)
```bash
# POST to /api/analyze
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "problem": "Freelancers struggle to track time",
    "description": "Need automated time tracking",
    "redditComments": 50,
    "redditUpvotes": 200
  }'
```

## 📁 Project Structure

```
ideaflow/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   ├── layout.tsx            # Root layout with theme
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # shadcn/ui components
│   ├── navbar.tsx            # Navigation header
│   ├── hero.tsx              # Hero section
│   ├── idea-card.tsx         # Idea card component
│   └── ...                   # Other components
├── lib/                      # Utilities and services
│   ├── services/             # Business logic
│   ├── supabase/             # Database client
│   ├── types.ts              # TypeScript types
│   └── mock-data.ts          # Development data
└── README.md                 # This file
```

## 🎨 Key Features Demo

The platform is **fully functional** with:
✅ Beautiful landing page with hero section
✅ Pinterest-style idea cards with animations
✅ Dark/light mode toggle
✅ Category filtering and sorting
✅ Detailed idea modal with tabs
✅ AI analysis integration (Claude API)
✅ Reddit scraper service
✅ API routes for data operations
✅ Responsive design

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ideaflow)

#### Quick Deploy Steps:

1. **Click the Deploy button above** or go to [Vercel](https://vercel.com)

2. **Import your repository** and click "Deploy"

3. **Configure Environment Variables** in Vercel Dashboard → Settings → Environment Variables:
   - Copy all variables from `.env.example`
   - Add your actual API keys and credentials
   - See detailed setup guide below

4. **Deploy!** Vercel will automatically build and deploy your app

### Environment Setup Guide

#### 1. Supabase Setup (5 minutes)
1. Go to [Supabase](https://supabase.com) and create a new project
2. Navigate to **Settings → API**
3. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon/public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
4. Go to **SQL Editor** and run the schema from `lib/supabase/schema.sql`

#### 2. Anthropic API (2 minutes)
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create an API key
3. Copy to `ANTHROPIC_API_KEY`

#### 3. Reddit API (5 minutes)
1. Go to [Reddit Apps](https://www.reddit.com/prefs/apps)
2. Click "Create App" or "Create Another App"
3. Fill in:
   - **Name**: IdeaFlow
   - **Type**: Script
   - **Redirect URI**: http://localhost:3000
4. Copy:
   - App ID (under name) → `REDDIT_CLIENT_ID`
   - Secret → `REDDIT_CLIENT_SECRET`

#### 4. Stripe Setup (10 minutes)
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Developers → API Keys**
3. Copy:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
4. Create a Pro subscription product:
   - **Products → Add Product**
   - Name: "IdeaFlow Pro"
   - Price: $19/month
   - Copy Price ID → `STRIPE_PRO_PRICE_ID`
5. Set up webhooks:
   - **Developers → Webhooks → Add endpoint**
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy webhook secret → `STRIPE_WEBHOOK_SECRET`

#### 5. Resend Email (3 minutes)
1. Go to [Resend](https://resend.com)
2. Add and verify your domain
3. Create an API key → `RESEND_API_KEY`
4. Set `EMAIL_FROM` to your verified email (e.g., `hello@yourdomain.com`)

#### 6. PostHog Analytics (2 minutes)
1. Go to [PostHog](https://app.posthog.com)
2. Create a project
3. Copy Project API Key → `NEXT_PUBLIC_POSTHOG_KEY`

### Production Checklist

Before going live, ensure:

- ✅ All environment variables are set in Vercel
- ✅ Supabase database schema is migrated
- ✅ Stripe products and webhooks are configured
- ✅ Domain is verified in Resend
- ✅ Reddit API credentials are working
- ✅ Test a full user flow (signup → browse → upgrade)
- ✅ Analytics are tracking correctly
- ✅ Email templates render properly
- ✅ Cron jobs are scheduled in Vercel
- ✅ Privacy policy and terms are updated with your info
- ✅ Custom domain is configured (Settings → Domains)

### Monitoring & Maintenance

- **Vercel Dashboard**: Monitor deployments, errors, and performance
- **Supabase Dashboard**: Check database health and usage
- **Stripe Dashboard**: Track revenue and subscriptions
- **PostHog**: Analyze user behavior and conversion funnels
- **Resend**: Monitor email delivery rates

### Scaling Tips

- Enable Vercel Pro for better performance and analytics
- Upgrade Supabase plan when you hit free tier limits
- Set up database indexes for faster queries
- Implement caching for AI analyses
- Use Vercel Edge Functions for global low-latency

## 🔄 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Browser extension for saving ideas
- [ ] Team collaboration features
- [ ] AI pitch deck PDF generation improvements
- [ ] Integration with project management tools
- [ ] Advanced analytics dashboard

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for indie hackers who want to build the next big thing.

**Start discovering validated ideas today!** 🚀
