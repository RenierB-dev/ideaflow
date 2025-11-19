'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp, Lightbulb, Rocket } from 'lucide-react';

interface WelcomeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onStartTour?: () => void;
}

export function WelcomeModal({ isOpen = false, onClose, onStartTour }: WelcomeModalProps) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleTakeTour = () => {
    handleClose();
    onStartTour?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center mb-4">
            Welcome to IdeaFlow! 🎉
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-center text-muted-foreground">
            Discover validated startup ideas from real problems discussed on Reddit.
            Let AI help you find your next big opportunity.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-1">100+ Ideas</h3>
              <p className="text-sm text-muted-foreground">
                Curated from Reddit
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold mb-1">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Market insights
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold mb-1">Validation Metrics</h3>
              <p className="text-sm text-muted-foreground">
                Data-backed ideas
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-3">
                <Rocket className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold mb-1">Launch Ready</h3>
              <p className="text-sm text-muted-foreground">
                Start building today
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-center">
              <strong>Pro Tip:</strong> Look for ideas with pain scores of 8+ and high validation.
              These are the best opportunities to build a successful startup!
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleClose}
            >
              Skip for Now
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={handleTakeTour}
            >
              Take the Tour
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            You can always restart the tour from your settings
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
