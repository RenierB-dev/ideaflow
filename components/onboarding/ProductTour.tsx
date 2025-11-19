'use client';

import { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, STATUS, ACTIONS, EVENTS } from 'react-joyride';

interface ProductTourProps {
  run?: boolean;
  onComplete?: () => void;
}

const steps: Step[] = [
  {
    target: 'body',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-2">Welcome to IdeaFlow! 🚀</h2>
        <p>Let's take a quick tour to help you discover validated startup ideas.</p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="ideas-grid"]',
    content: (
      <div>
        <h3 className="font-bold mb-2">Browse Validated Ideas</h3>
        <p>Each card shows a real problem people are discussing on Reddit.
        These are validated opportunities backed by engagement metrics.</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="idea-card"]',
    content: (
      <div>
        <h3 className="font-bold mb-2">Idea Cards</h3>
        <p>See pain scores, validation metrics, and engagement stats at a glance.
        Higher pain scores (8-10) indicate stronger problems to solve.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="filters"]',
    content: (
      <div>
        <h3 className="font-bold mb-2">Filter & Sort</h3>
        <p>Narrow down ideas by category, pain score, or market size.
        Sort by trending, newest, or highest pain.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '[data-tour="view-details"]',
    content: (
      <div>
        <h3 className="font-bold mb-2">AI Analysis (Pro)</h3>
        <p>Click "View Details" to see comprehensive AI-powered market analysis,
        monetization strategies, and tech recommendations.</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '[data-tour="save-idea"]',
    content: (
      <div>
        <h3 className="font-bold mb-2">Save Your Favorites</h3>
        <p>Click the bookmark icon to save ideas to your personal board for later.</p>
      </div>
    ),
    placement: 'left',
  },
  {
    target: '[data-tour="upgrade"]',
    content: (
      <div>
        <h3 className="font-bold mb-2">Unlock Pro Features</h3>
        <p>Upgrade to Pro for unlimited AI analysis, email alerts, and more.
        Just $19/month to supercharge your idea discovery.</p>
      </div>
    ),
    placement: 'bottom',
  },
];

export function ProductTour({ run = false, onComplete }: ProductTourProps) {
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    setRunTour(run);
  }, [run]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action, type } = data;

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setRunTour(false);
      onComplete?.();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={runTour}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#0070f3',
          textColor: '#1a1a1a',
          backgroundColor: '#ffffff',
          arrowColor: '#ffffff',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 12,
          padding: 20,
        },
        tooltipContent: {
          padding: '10px 0',
        },
        buttonNext: {
          backgroundColor: '#0070f3',
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: 14,
          fontWeight: 600,
        },
        buttonBack: {
          color: '#6b7280',
          marginRight: 10,
        },
        buttonSkip: {
          color: '#6b7280',
        },
      }}
      locale={{
        last: 'Finish',
        skip: 'Skip Tour',
        next: 'Next',
        back: 'Back',
      }}
    />
  );
}
