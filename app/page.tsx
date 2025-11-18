"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Filters } from "@/components/filters"
import { IdeasGrid } from "@/components/ideas-grid"
import { mockIdeas } from "@/lib/mock-data"

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("trending")

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const filteredAndSortedIdeas = useMemo(() => {
    let ideas = [...mockIdeas]

    // Filter by categories
    if (selectedCategories.length > 0) {
      ideas = ideas.filter(
        (idea) => idea.category && selectedCategories.includes(idea.category.name)
      )
    }

    // Sort
    switch (sortBy) {
      case "trending":
        ideas.sort((a, b) => {
          const scoreA = a.validation_score + (a.upvotes + a.reddit_upvotes) * 10
          const scoreB = b.validation_score + (b.upvotes + b.reddit_upvotes) * 10
          return scoreB - scoreA
        })
        break
      case "newest":
        ideas.sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        break
      case "pain":
        ideas.sort((a, b) => b.pain_score - a.pain_score)
        break
      case "validation":
        ideas.sort((a, b) => b.validation_score - a.validation_score)
        break
    }

    return ideas
  }, [selectedCategories, sortBy])

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      <div className="container py-12">
        <Filters
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="mt-8">
          {filteredAndSortedIdeas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-2xl font-bold">No ideas found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or check back later for new ideas
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{filteredAndSortedIdeas.length}</span> ideas
                </p>
              </div>
              <IdeasGrid ideas={filteredAndSortedIdeas} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
