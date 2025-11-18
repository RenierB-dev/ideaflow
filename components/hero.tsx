"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, TrendingUp, Zap, Search } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-pink-950/20" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      <div className="container relative">
        <div className="flex flex-col items-center justify-center space-y-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border bg-background/60 backdrop-blur-sm px-4 py-1.5 text-sm"
          >
            <Sparkles className="mr-2 h-4 w-4 text-purple-600" />
            <span className="text-muted-foreground">
              Discover your next big idea
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          >
            Turn <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Real Problems</span>{" "}
            into Validated Startup Ideas
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            AI-powered discovery of startup opportunities from Reddit discussions.
            Get market insights, competition analysis, and monetization strategies
            for problems people actually want solved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex w-full max-w-md flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search ideas..."
                className="pl-10 bg-background/60 backdrop-blur-sm"
              />
            </div>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Explore Ideas
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 pt-8"
          >
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-muted-foreground">Ideas Analyzed</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">AI-Powered</div>
                <div className="text-sm text-muted-foreground">Deep Analysis</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
                <Sparkles className="h-5 w-5 text-pink-600" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">Daily</div>
                <div className="text-sm text-muted-foreground">New Updates</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
