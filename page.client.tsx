// src/app/(frontend)/scholarships/page.client.tsx
'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useHeaderTheme } from '@/providers/HeaderTheme'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export interface ScholarshipCard {
  id: string | number
  title: string
  slug: string | null | undefined // Make slug nullable to match API type
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
  categories?: { title: string }[]
}

export default function ScholarshipsPageClient({
  scholarships,
}: {
  scholarships: ScholarshipCard[]
}) {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
    return () => setHeaderTheme('dark')
  }, [setHeaderTheme])

  return (
    <div className="container py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Scholarships</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Find scholarships to help fund your education and achieve your academic goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((scholarship) => (
          <Link href={`/scholarships/${scholarship.slug || ''}`} key={scholarship.id}>
            <Card className="h-full transition-all hover:shadow-md">
              {scholarship.mainImage && (
                <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={scholarship.mainImage.sizes?.medium?.url || scholarship.mainImage.url}
                    alt={scholarship.mainImage.alt || scholarship.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{scholarship.title}</CardTitle>
                {scholarship.categories && scholarship.categories.length > 0 && (
                  <CardDescription>
                    {scholarship.categories.map((cat) => cat.title).join(', ')}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">Award Amount</p>
                <p className="font-medium">{scholarship.awardAmount}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-blue-600 dark:text-blue-400">View Details →</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
