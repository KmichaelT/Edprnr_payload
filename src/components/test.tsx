'use client'

import { ArrowRight, ArrowUpDown, ChevronDown } from 'lucide-react'
import React, { useState, useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

interface ListItem {
  title: string
  category: string
  description: string
  award: string
  deadline: string
  link: string
}

interface List2Props {
  heading?: string
  items?: ListItem[]
}

const List1 = ({
  heading = 'Our Achievements & Recognition',
  items = [
    {
      title: 'Women in Tech Scholarship',
      category: 'Gender-specific',
      description: 'Scholarship for female students pursuing degrees in technology fields.',
      award: 'Full Tuition',
      deadline: 'March 31, 2025',
      link: 'https://example.com/women-in-tech',
    },
    {
      title: 'Minority Achievement Award',
      category: 'Minority',
      description: 'Award for minority students demonstrating academic excellence.',
      award: 'Partial Scholarship',
      deadline: 'April 15, 2025',
      link: 'https://example.com/minority-achievement',
    },
    {
      title: 'STEM Excellence Scholarship',
      category: 'Field-specific',
      description: 'Supports students excelling in science, technology, engineering, and math.',
      award: 'Merit-Based',
      deadline: 'May 10, 2025',
      link: 'https://example.com/stem-excellence',
    },
    {
      title: 'Community Leadership Scholarship',
      category: 'Merit-Based',
      description: 'For students who have shown outstanding leadership and community service.',
      award: 'Full Tuition',
      deadline: 'June 1, 2025',
      link: 'https://example.com/community-leadership',
    },
    {
      title: 'Global Innovators Scholarship',
      category: 'International',
      description: 'For students demonstrating innovative thinking on a global scale.',
      award: 'Full Scholarship',
      deadline: 'July 20, 2025',
      link: 'https://example.com/global-innovators',
    },
    {
      title: 'Future Educators Scholarship',
      category: 'Education',
      description:
        'Award for students pursuing a career in education with excellent academic records.',
      award: 'Partial Scholarship',
      deadline: 'August 5, 2025',
      link: 'https://example.com/future-educators',
    },
  ],
}: List2Props) => {
  // Extract unique award types and categories for filters
  const uniqueAwards = useMemo(() => [...new Set(items.map((item) => item.award))], [items])
  const uniqueCategories = useMemo(() => [...new Set(items.map((item) => item.category))], [items])

  // State for filters and sorting
  const [selectedAward, setSelectedAward] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let result = [...items]

    // Apply award filter
    if (selectedAward) {
      result = result.filter((item) => item.award === selectedAward)
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter((item) => item.category === selectedCategory)
    }

    // Sort by deadline
    result.sort((a, b) => {
      const dateA = new Date(a.deadline)
      const dateB = new Date(b.deadline)
      return sortDirection === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    })

    return result
  }, [items, selectedAward, selectedCategory, sortDirection])

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
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-semibold md:text-4xl">{heading}</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Award Filter */}
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

            {/* Category Filter */}
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
        {filteredItems.length === 0 && (
          <div className="text-center py-12 border rounded-lg">
            <p className="text-muted-foreground">No scholarships match your filters.</p>
            <Button variant="link" onClick={resetFilters} className="mt-2">
              Reset all filters
            </Button>
          </div>
        )}

        {/* Desktop view - Table layout */}
        {filteredItems.length > 0 && (
          <div className="hidden md:block">
            <div className="rounded-lg border">
              <div className="grid items-center gap-4 px-6 py-4 bg-muted/50 font-medium text-sm md:grid-cols-10">
                <div className="md:col-span-4">Scholarship</div>
                <div className="md:col-span-3">Award</div>
                <div className="md:col-span-2">
                  <div className="flex items-center gap-1">
                    Deadline
                    <button
                      onClick={toggleSortDirection}
                      className="p-1 rounded-full hover:bg-muted"
                    >
                      <ArrowUpDown
                        className={`h-3 w-3 ${sortDirection === 'desc' ? 'rotate-180 transform' : ''} transition-transform`}
                      />
                      <span className="sr-only">
                        Sort by deadline {sortDirection === 'asc' ? 'ascending' : 'descending'}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="md:col-span-1 text-right">Details</div>
              </div>
              <Separator />

              {filteredItems.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="grid items-center gap-4 px-6 py-4 md:grid-cols-10">
                    <div className="md:col-span-4">
                      <h3 className="font-semibold">{item.title}</h3>
                      <Badge variant="outline" className="mt-1">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="md:col-span-3 font-medium">{item.award}</div>
                    <div className="md:col-span-2">{item.deadline}</div>
                    <div className="md:col-span-1 text-right">
                      <Button variant="outline" size="sm" asChild>
                        <a href={item.link} className="inline-flex items-center gap-1">
                          Details
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  {index < filteredItems.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Mobile view - Card layout */}
        {filteredItems.length > 0 && (
          <div className="grid gap-4 md:hidden">
            {filteredItems.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <Badge variant="outline" className="mt-1">
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Award</p>
                      <p className="font-medium">{item.award}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                      <p>{item.deadline}</p>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={item.link} className="inline-flex items-center justify-center gap-1">
                      View Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
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

export { List1 }
