'use client'

import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { ArrowRight, ArrowUpDown, ChevronDown } from 'lucide-react'
import React, { useState, useMemo } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { formatDateTime } from '@/utilities/formatDateTime'

export interface ScholarshipItem {
  id: string | number
  title: string
  slug?: string | null
  mainImage?: {
    url: string
    alt?: string
    sizes?: {
      [key: string]: {
        url: string
        width: number
        height: number
      }
    }
  }
  awardAmount: string
  publishedAt?: string
  categories?: { title: string }[]
}

interface ScholarshipGridProps {
  scholarships: ScholarshipItem[]
}

export const ScholarshipGrid: React.FC<ScholarshipGridProps> = ({ scholarships = [] }) => {
  // Extract unique award types and categories for filters
  const uniqueAwards = useMemo(
    () => [...new Set(scholarships.map((item) => item.awardAmount))],
    [scholarships],
  )

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>()
    scholarships.forEach((scholarship) => {
      if (scholarship.categories && Array.isArray(scholarship.categories)) {
        scholarship.categories.forEach((category) => {
          if (typeof category === 'object' && category.title) {
            categories.add(category.title)
          }
        })
      }
    })
    return [...categories]
  }, [scholarships])

  // State for filters and sorting
  const [selectedAward, setSelectedAward] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // Filter and sort items
  const filteredScholarships = useMemo(() => {
    let result = [...scholarships]

    // Apply award filter
    if (selectedAward) {
      result = result.filter((item) => item.awardAmount === selectedAward)
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter((item) =>
        item.categories?.some(
          (category) => typeof category === 'object' && category.title === selectedCategory,
        ),
      )
    }

    // Sort by publishedAt date if available, or fall back to order as received
    result.sort((a, b) => {
      if (a.publishedAt && b.publishedAt) {
        const dateA = new Date(a.publishedAt)
        const dateB = new Date(b.publishedAt)
        return sortDirection === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime()
      }
      return 0
    })

    return result
  }, [scholarships, selectedAward, selectedCategory, sortDirection])

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedAward(null)
    setSelectedCategory(null)
    setSortDirection('asc')
  }

  return (
    <section className="py-6">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex flex-col gap-2 w-full md:max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search scholarships..."
                className="w-full h-10 pl-10 pr-4 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onChange={(e) => {
                  // Search functionality would be implemented here
                  console.log('Search query:', e.target.value)
                }}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Award Filter */}
            {uniqueAwards.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="justify-between w-full sm:w-auto">
                    {selectedAward || 'Filter by Award'}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Award Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelectedAward(null)}>
                    All Awards
                  </DropdownMenuItem>
                  {uniqueAwards.map((award) => (
                    <DropdownMenuCheckboxItem
                      key={award}
                      checked={selectedAward === award}
                      onCheckedChange={() => setSelectedAward(award)}
                    >
                      {award}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Category Filter */}
            {uniqueCategories.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="justify-between w-full sm:w-auto">
                    {selectedCategory || 'Filter by Category'}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Scholarship Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                    All Categories
                  </DropdownMenuItem>
                  {uniqueCategories.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={selectedCategory === category}
                      onCheckedChange={() => setSelectedCategory(category)}
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Reset Filters */}
            {(selectedAward || selectedCategory || sortDirection !== 'asc') && (
              <Button variant="ghost" onClick={resetFilters} className="w-full sm:w-auto" size="sm">
                Reset Filters
              </Button>
            )}
          </div>
        </div>

        {/* Filter summary */}
        {(selectedAward || selectedCategory) && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Filtered by:</span>
            {selectedAward && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Award: {selectedAward}
                <button
                  onClick={() => setSelectedAward(null)}
                  className="ml-1 rounded-full hover:bg-muted p-0.5"
                >
                  <span className="sr-only">Remove award filter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Category: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="ml-1 rounded-full hover:bg-muted p-0.5"
                >
                  <span className="sr-only">Remove category filter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Empty state */}
        {filteredScholarships.length === 0 && (
          <div className="text-center py-12 border rounded-lg">
            <p className="text-muted-foreground">No scholarships match your filters.</p>
            <Button variant="link" onClick={resetFilters} className="mt-2">
              Reset all filters
            </Button>
          </div>
        )}

        {/* Desktop view - Table layout */}
        {filteredScholarships.length > 0 && (
          <div className="hidden md:block">
            <div className="rounded-lg border">
              <div className="grid items-center gap-4 px-6 py-4 bg-muted/50 font-medium text-sm md:grid-cols-10">
                <div className="md:col-span-4">Scholarship</div>
                <div className="md:col-span-3">Award</div>
                <div className="md:col-span-2">
                  <div className="flex items-center gap-1">
                    Date
                    <button
                      onClick={toggleSortDirection}
                      className="p-1 rounded-full hover:bg-muted"
                    >
                      <ArrowUpDown
                        className={`h-3 w-3 ${sortDirection === 'desc' ? 'rotate-180 transform' : ''} transition-transform`}
                      />
                      <span className="sr-only">
                        Sort by date {sortDirection === 'asc' ? 'ascending' : 'descending'}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="md:col-span-1 text-right">Details</div>
              </div>
              <Separator />

              {filteredScholarships.map((scholarship, index) => (
                <React.Fragment key={scholarship.id}>
                  <div className="grid items-center gap-4 px-6 py-4 md:grid-cols-10">
                    <div className="md:col-span-4">
                      <h3 className="font-semibold">{scholarship.title}</h3>
                      {scholarship.categories && scholarship.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {scholarship.categories.map(
                            (category, catIndex) =>
                              typeof category === 'object' && (
                                <Badge key={catIndex} variant="outline">
                                  {category.title}
                                </Badge>
                              ),
                          )}
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-3 font-medium">{scholarship.awardAmount}</div>
                    <div className="md:col-span-2">
                      {scholarship.publishedAt && formatDateTime(scholarship.publishedAt)}
                    </div>
                    <div className="md:col-span-1 text-right">
                      <Button variant="outline" size="sm" asChild>
                        {scholarship.slug ? (
                          <Link
                            href={`/scholarships/${scholarship.slug}`}
                            className="inline-flex items-center gap-1"
                          >
                            Details
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            Details
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                  {index < filteredScholarships.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Mobile view - Card layout */}
        {filteredScholarships.length > 0 && (
          <div className="grid gap-4 md:hidden">
            {filteredScholarships.map((scholarship) => (
              <Card key={scholarship.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{scholarship.title}</h3>
                      {scholarship.categories && scholarship.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {scholarship.categories.map(
                            (category, catIndex) =>
                              typeof category === 'object' && (
                                <Badge key={catIndex} variant="outline">
                                  {category.title}
                                </Badge>
                              ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Award</p>
                      <p className="font-medium">{scholarship.awardAmount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p>{scholarship.publishedAt && formatDateTime(scholarship.publishedAt)}</p>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full" asChild>
                    {scholarship.slug ? (
                      <Link
                        href={`/scholarships/${scholarship.slug}`}
                        className="inline-flex items-center justify-center gap-1"
                      >
                        View Details
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center justify-center gap-1">
                        View Details
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
