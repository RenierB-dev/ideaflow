import posthog from 'posthog-js';

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

    if (!key) {
      console.warn('PostHog key not configured');
      return;
    }

    posthog.init(key, {
      api_host: host,
      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') {
          ph.debug();
        }
      },
      capture_pageview: false, // We'll manually capture pageviews
      capture_pageleave: true,
      autocapture: false, // Disable autocapture for better control
    });
  }
};

// Track events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.capture(eventName, properties);
  }
};

// Track page views
export const trackPageView = (path?: string) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.capture('$pageview', {
      $current_url: path || window.location.pathname,
    });
  }
};

// Identify user
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.identify(userId, properties);
  }
};

// Set user properties
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.people.set(properties);
  }
};

// Reset user (on logout)
export const resetUser = () => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.reset();
  }
};

// Feature flags
export const isFeatureEnabled = (flagKey: string): boolean => {
  if (typeof window !== 'undefined' && posthog) {
    return posthog.isFeatureEnabled(flagKey) || false;
  }
  return false;
};

// Common events
export const analytics = {
  // User events
  userSignedUp: (properties?: Record<string, any>) => {
    trackEvent('user_signed_up', properties);
  },

  userLoggedIn: (properties?: Record<string, any>) => {
    trackEvent('user_logged_in', properties);
  },

  userLoggedOut: () => {
    trackEvent('user_logged_out');
    resetUser();
  },

  // Idea events
  ideaViewed: (ideaId: string, properties?: Record<string, any>) => {
    trackEvent('idea_viewed', { idea_id: ideaId, ...properties });
  },

  ideaSaved: (ideaId: string, properties?: Record<string, any>) => {
    trackEvent('idea_saved', { idea_id: ideaId, ...properties });
  },

  ideaUnsaved: (ideaId: string) => {
    trackEvent('idea_unsaved', { idea_id: ideaId });
  },

  // AI Analysis events
  aiAnalysisViewed: (ideaId: string, properties?: Record<string, any>) => {
    trackEvent('ai_analysis_viewed', { idea_id: ideaId, ...properties });
  },

  // Filter/Search events
  categoryFiltered: (category: string) => {
    trackEvent('category_filtered', { category });
  },

  sortChanged: (sortType: string) => {
    trackEvent('sort_changed', { sort_type: sortType });
  },

  searchPerformed: (query: string, resultsCount: number) => {
    trackEvent('search_performed', { query, results_count: resultsCount });
  },

  // Subscription events
  upgradeClicked: (source: string) => {
    trackEvent('upgrade_clicked', { source });
  },

  upgradeToPro: (plan: string, amount: number) => {
    trackEvent('upgrade_to_pro', { plan, amount });
  },

  subscriptionCancelled: (reason?: string) => {
    trackEvent('subscription_cancelled', { reason });
  },

  // Referral events
  referralSent: (method: string) => {
    trackEvent('referral_sent', { method });
  },

  referralCompleted: () => {
    trackEvent('referral_completed');
  },

  // Onboarding events
  onboardingStarted: () => {
    trackEvent('onboarding_started');
  },

  onboardingCompleted: () => {
    trackEvent('onboarding_completed');
  },

  onboardingSkipped: (step: string) => {
    trackEvent('onboarding_skipped', { step });
  },

  // Engagement events
  emailOpened: (emailType: string) => {
    trackEvent('email_opened', { email_type: emailType });
  },

  linkClicked: (linkName: string, destination: string) => {
    trackEvent('link_clicked', { link_name: linkName, destination });
  },
};

export default posthog;
