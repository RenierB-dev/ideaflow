"use client"

import { useState } from "react"
import { IdeaCard } from "@/components/idea-card"
import { IdeaDetailModal } from "@/components/idea-detail-modal"
import type { Idea } from "@/lib/types"

interface IdeasGridProps {
  ideas: Idea[]
}

export function IdeasGrid({ ideas }: IdeasGridProps) {
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ideas.map((idea, index) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            index={index}
            onClick={() => setSelectedIdea(idea)}
          />
        ))}
      </div>

      {selectedIdea && (
        <IdeaDetailModal
          idea={selectedIdea}
          open={!!selectedIdea}
          onOpenChange={(open) => !open && setSelectedIdea(null)}
        />
      )}
    </>
  )
}
