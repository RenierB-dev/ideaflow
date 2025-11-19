'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Lightbulb, Bookmark, Sparkles, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

interface QuickStartChecklistProps {
  onClose?: () => void;
}

export function QuickStartChecklist({ onClose }: QuickStartChecklistProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: 'browse',
      title: 'Browse your first idea',
      description: 'Explore the idea cards and see what problems people are facing',
      icon: <Lightbulb className="w-5 h-5" />,
      completed: false,
    },
    {
      id: 'save',
      title: 'Save an idea to your board',
      description: 'Click the bookmark icon to save interesting ideas',
      icon: <Bookmark className="w-5 h-5" />,
      completed: false,
    },
    {
      id: 'analysis',
      title: 'Check AI analysis',
      description: 'View detailed market insights (Pro feature)',
      icon: <Sparkles className="w-5 h-5" />,
      completed: false,
    },
    {
      id: 'filter',
      title: 'Try filtering by category',
      description: 'Find ideas in your favorite niche',
      icon: <Filter className="w-5 h-5" />,
      completed: false,
    },
  ]);

  // Load completion state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ideaflow-checklist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setItems(parsed);
      } catch (e) {
        console.error('Failed to parse checklist state:', e);
      }
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    localStorage.setItem('ideaflow-checklist', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progress = (completedCount / totalCount) * 100;
  const allCompleted = completedCount === totalCount;

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('ideaflow-checklist-dismissed', 'true');
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <Card className="w-full max-w-md border-2 border-blue-200 dark:border-blue-800 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              Quick Start Guide
              {allCompleted && <span className="text-xl">🎉</span>}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {allCompleted
                ? "You're all set! Start discovering ideas."
                : `${completedCount} of ${totalCount} completed`}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-500",
              allCompleted
                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                : "bg-gradient-to-r from-blue-500 to-purple-500"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50",
              item.completed
                ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            )}
            onClick={() => toggleItem(item.id)}
          >
            <div
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                item.completed
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400"
              )}
            >
              {item.completed ? (
                <Check className="w-4 h-4" />
              ) : (
                item.icon
              )}
            </div>

            <div className="flex-1">
              <h4
                className={cn(
                  "font-medium text-sm",
                  item.completed && "line-through text-muted-foreground"
                )}
              >
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.description}
              </p>
            </div>
          </div>
        ))}

        {allCompleted && (
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-center font-medium">
              🎊 Great job! You're ready to discover your next startup idea.
            </p>
            <Button
              className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={handleDismiss}
            >
              Start Exploring
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
