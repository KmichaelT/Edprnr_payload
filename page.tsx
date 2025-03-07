// src/app/(frontend)/scholarships/page.tsx
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ScholarshipsPageClient, { ScholarshipCard } from './page.client'

export const metadata: Metadata = {
  title: 'Scholarships',
  description: 'Find scholarships to help fund your education and achieve your academic goals.',
}

export default async function ScholarshipsPage() {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const scholarships = await payload.find({
    collection: 'scholarships',
    depth: 1,
    limit: 12,
    draft,
    sort: '-createdAt',
    select: {
      title: true,
      slug: true,
      mainImage: true,
      awardAmount: true,
      categories: true,
      createdAt: true,
    },
  })

  // In src/app/(frontend)/scholarships/page.tsx
  return <ScholarshipsPageClient scholarships={scholarships.docs as unknown as ScholarshipCard[]} />
}
