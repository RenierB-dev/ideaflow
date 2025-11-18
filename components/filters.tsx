"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SlidersHorizontal, X } from "lucide-react"

interface FiltersProps {
  selectedCategories: string[]
  onCategoryToggle: (category: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

const categories = [
  { name: "SaaS", color: "#3B82F6" },
  { name: "E-commerce", color: "#10B981" },
  { name: "Productivity", color: "#8B5CF6" },
  { name: "Health & Fitness", color: "#EF4444" },
  { name: "Education", color: "#F59E0B" },
  { name: "Finance", color: "#06B6D4" },
  { name: "Marketing", color: "#EC4899" },
  { name: "Developer Tools", color: "#6366F1" },
]

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "newest", label: "Newest" },
  { value: "pain", label: "Highest Pain" },
  { value: "validation", label: "Most Validated" },
]

export function Filters({ selectedCategories, onCategoryToggle, sortBy, onSortChange }: FiltersProps) {
  return (
    <div className="space-y-6">
      {/* Sort Options */}
      <div className="flex flex-wrap items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Sort:</span>
        {sortOptions.map((option) => (
          <Button
            key={option.value}
            variant={sortBy === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => onSortChange(option.value)}
            className={sortBy === option.value ? "bg-gradient-to-r from-purple-600 to-blue-600" : ""}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Category Filters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Categories:</span>
          {selectedCategories.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => selectedCategories.forEach(onCategoryToggle)}
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.name)
            return (
              <Badge
                key={category.name}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105"
                style={
                  isSelected
                    ? { backgroundColor: category.color, borderColor: category.color }
                    : { borderColor: category.color, color: category.color }
                }
                onClick={() => onCategoryToggle(category.name)}
              >
                {category.name}
                {isSelected && <X className="ml-1 h-3 w-3" />}
              </Badge>
            )
          })}
        </div>
      </div>
    </div>
  )
}
