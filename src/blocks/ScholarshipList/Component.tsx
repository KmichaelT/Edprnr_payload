import type { Category, Scholarship } from '@/payload-types' 
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { ScholarshipGrid } from './ScholarshipGrid'
import type { ScholarshipItem } from './ScholarshipGrid'

interface ScholarshipListProps {
  id?: string
  blockName?: string
  blockType: 'scholarshipList'
  categories?: { id: string | number }[] | (string | number)[] 
  introContent?: DefaultTypedEditorState
  limit?: number
  populateBy?: 'collection' | 'selection'
  selectedDocs?: Array<{ value: string | number | Scholarship; relationTo: string }>
}

export const ScholarshipListBlock: React.FC<ScholarshipListProps> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 10

  let scholarships: Scholarship[] = []

  if (populateBy === 'collection') {
    try {
      const payload = await getPayload({ config: configPromise })

      const flattenedCategories = categories?.map((category: { id: string | number } | string | number) => {
        if (typeof category === 'object') return category.id
        else return category
      })

      const fetchedScholarships = await payload.find({
        collection: 'scholarships',
        depth: 1,
        limit,
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              where: {
                categories: {
                  in: flattenedCategories,
                },
              },
            }
          : {}),
      })

      scholarships = fetchedScholarships.docs as Scholarship[]
    } catch (error) {
      console.error('Error fetching scholarships:', error)
      // Return empty array on error
      scholarships = []
    }
  } else if (selectedDocs?.length) {
    // Handle manual selection
    const filteredSelectedScholarships = selectedDocs
      .filter(scholarship => typeof scholarship.value === 'object')
      .map(scholarship => scholarship.value as Scholarship)

    scholarships = filteredSelectedScholarships
  }

  // Transform scholarship data on the server before passing to client component
  const formattedScholarships = scholarships.map(formatScholarshipData)

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <ScholarshipGrid scholarships={formattedScholarships} />
    </div>
  )
}

/**
 * Format Scholarship data to match ScholarshipItem interface
 * This transforms server data types to simpler client-friendly types
 */
const formatScholarshipData = (scholarship: Scholarship): ScholarshipItem => {
  // Create a safe, serializable mainImage object without complex nested types
  let mainImageData: ScholarshipItem['mainImage'] = undefined;
  
  if (typeof scholarship.mainImage === 'object' && scholarship.mainImage !== null) {
    mainImageData = {
      url: scholarship.mainImage.url || '',
      alt: scholarship.mainImage.alt || ''
      // Deliberately omit sizes to avoid type issues
    }
  }

  // Create a simplified, client-safe version of the scholarship data
  return {
    id: scholarship.id,
    title: scholarship.title,
    slug: scholarship.slug,
    mainImage: mainImageData,
    awardAmount: scholarship.awardAmount || '',
    publishedAt: scholarship.publishedAt || '',
    categories: scholarship.meta?.categories?.map(cat => {
      if (typeof cat === 'object' && cat !== null) {
        return { title: (cat as Category).title || '' }
      }
      return { title: '' }
    }) || [],
  }
}
