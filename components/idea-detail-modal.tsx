"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Heart,
  TrendingUp,
  MessageSquare,
  ExternalLink,
  Target,
  Users,
  DollarSign,
  Code,
  Clock,
  Lightbulb,
  Download,
  Lock
} from "lucide-react"
import type { Idea } from "@/lib/types"

interface IdeaDetailModalProps {
  idea: Idea
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function IdeaDetailModal({ idea, open, onOpenChange }: IdeaDetailModalProps) {
  const isPro = false // TODO: Get from user subscription

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  style={idea.category?.color ? { backgroundColor: `${idea.category.color}20`, color: idea.category.color } : {}}
                >
                  {idea.category?.name || 'Other'}
                </Badge>
                <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                  Pain Score: {idea.pain_score}/10
                </Badge>
              </div>
              <DialogTitle className="text-2xl">{idea.problem}</DialogTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              {idea.reddit_url && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(idea.reddit_url!, '_blank')}
                >
                  <ExternalLink className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Validation</p>
                  <p className="text-2xl font-bold">{idea.validation_score}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                  <p className="text-2xl font-bold">{idea.reddit_comments}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Market Size</p>
                  <p className="text-2xl font-bold">{idea.market_size || 'TBD'}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">
              AI Analysis {!isPro && <Lock className="ml-2 h-3 w-3" />}
            </TabsTrigger>
            <TabsTrigger value="pitch">
              Pitch Deck {!isPro && <Lock className="ml-2 h-3 w-3" />}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Problem Statement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {idea.description || idea.problem}
                </p>
              </CardContent>
            </Card>

            {idea.ai_analysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {idea.ai_analysis.keyInsights?.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-purple-600">•</span>
                        <span className="text-muted-foreground">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            {!isPro ? (
              <Card className="border-2 border-purple-200 dark:border-purple-800">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Lock className="mb-4 h-12 w-12 text-purple-600" />
                  <h3 className="mb-2 text-xl font-bold">Upgrade to Pro</h3>
                  <p className="mb-6 text-center text-muted-foreground">
                    Get AI-powered market analysis, competition insights, and monetization strategies
                  </p>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Unlock for $19/mo
                  </Button>
                </CardContent>
              </Card>
            ) : idea.ai_analysis ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Target Customer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{idea.ai_analysis.targetCustomer}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Monetization Ideas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {idea.ai_analysis.monetizationIdeas?.map((idea, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600">$</span>
                          <span className="text-muted-foreground">{idea}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Recommended Tech Stack
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {idea.ai_analysis.techStack?.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Build Time Estimate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{idea.ai_analysis.buildTimeEstimate}</p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">AI analysis not available for this idea yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="pitch" className="space-y-4">
            {!isPro ? (
              <Card className="border-2 border-purple-200 dark:border-purple-800">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Lock className="mb-4 h-12 w-12 text-purple-600" />
                  <h3 className="mb-2 text-xl font-bold">Upgrade to Pro</h3>
                  <p className="mb-6 text-center text-muted-foreground">
                    Generate AI-powered pitch decks with market analysis and go-to-market strategies
                  </p>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Unlock for $19/mo
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Download className="mb-4 h-12 w-12 text-purple-600" />
                  <h3 className="mb-2 text-xl font-bold">Generate Pitch Deck</h3>
                  <p className="mb-6 text-center text-muted-foreground">
                    Create a professional 5-slide pitch deck with AI-generated insights
                  </p>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
