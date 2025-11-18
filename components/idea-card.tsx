"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, TrendingUp, Eye, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import type { Idea } from "@/lib/types"

interface IdeaCardProps {
  idea: Idea
  index: number
  onClick?: () => void
}

export function IdeaCard({ idea, index, onClick }: IdeaCardProps) {
  const getPainScoreColor = (score: number) => {
    if (score >= 8) return "text-red-600 dark:text-red-400"
    if (score >= 5) return "text-orange-600 dark:text-orange-400"
    return "text-yellow-600 dark:text-yellow-400"
  }

  const getMarketSizeColor = (size: string) => {
    if (size === "Large") return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
    if (size === "Medium") return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="group h-full cursor-pointer overflow-hidden border-2 transition-all hover:border-purple-200 hover:shadow-xl dark:hover:border-purple-800">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <Badge
              variant="secondary"
              className={idea.category?.color ? `border-transparent` : ''}
              style={idea.category?.color ? { backgroundColor: `${idea.category.color}20`, color: idea.category.color } : {}}
            >
              {idea.category?.name || 'Other'}
            </Badge>

            {/* Pain Score Gauge */}
            <div className="flex items-center space-x-1">
              <span className="text-xs text-muted-foreground">Pain:</span>
              <div className="flex items-center">
                <span className={`text-lg font-bold ${getPainScoreColor(idea.pain_score)}`}>
                  {idea.pain_score}
                </span>
                <span className="text-xs text-muted-foreground">/10</span>
              </div>
            </div>
          </div>

          <h3 className="line-clamp-2 text-lg font-bold leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400">
            {idea.problem}
          </h3>

          {idea.description && (
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {idea.description}
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Validation Score Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Validation Score</span>
              <span className="font-medium">{idea.validation_score}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((idea.validation_score / 1000) * 100, 100)}%` }}
                transition={{ duration: 0.8, delay: index * 0.05 + 0.2 }}
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
              />
            </div>
          </div>

          {/* Metrics */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>{idea.upvotes + idea.reddit_upvotes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-3 w-3" />
              <span>{idea.reddit_comments}</span>
            </div>
            {idea.market_size && (
              <Badge variant="outline" className={`text-[10px] ${getMarketSizeColor(idea.market_size)}`}>
                {idea.market_size}
              </Badge>
            )}
          </div>

          {/* AI Analysis Badge */}
          {idea.analyzed && idea.ai_analysis && (
            <div className="flex items-center space-x-1 rounded-md bg-purple-50 px-2 py-1 dark:bg-purple-900/20">
              <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                ✨ AI Analyzed
              </span>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={(e) => {
                e.stopPropagation()
                // Handle save
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
            {idea.reddit_url && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={(e) => {
                  e.stopPropagation()
                  if (idea.reddit_url) {
                    window.open(idea.reddit_url, '_blank')
                  }
                }}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button
            size="sm"
            onClick={onClick}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
