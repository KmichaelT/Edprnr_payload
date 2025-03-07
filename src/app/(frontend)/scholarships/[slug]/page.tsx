// src/app/(frontend)/scholarships/[slug]/page.tsx
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import ScholarshipDetailClient from './page.client'
import type { Scholarship } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const scholarships = await payload.find({
    collection: 'scholarships',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = scholarships.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

// Transform Scholarship data from Payload to the format expected by the client component
const transformScholarshipData = (scholarship: Scholarship) => {
  // Handle mainImage transformation
  let mainImage
  if (typeof scholarship.mainImage === 'object' && scholarship.mainImage !== null) {
    // Create a properly formatted sizes object that matches the client component's expectations
    const formattedSizes: { [key: string]: { url: string; width: number; height: number } } = {}

    // Only include sizes that have all required properties
    if (scholarship.mainImage.sizes) {
      Object.entries(scholarship.mainImage.sizes).forEach(([key, size]) => {
        if (size && typeof size === 'object' && size.url && size.width && size.height) {
          formattedSizes[key] = {
            url: size.url,
            width: size.width,
            height: size.height,
          }
        }
      })
    }

    mainImage = {
      url: scholarship.mainImage.url || '',
      alt: scholarship.mainImage.alt || '',
      sizes: Object.keys(formattedSizes).length > 0 ? formattedSizes : undefined,
    }
  }

  // Transform eligibility items to ensure id is always a string
  const formattedEligibility = (scholarship.eligibility || []).map((item) => ({
    id: item.id || `eligibility-${Math.random().toString(36).substring(2, 11)}`,
    item: item.item,
  }))

  // Transform sidebar benefits to ensure id and item are always strings
  const formattedBenefits = (scholarship.sidebar?.benefits || []).map((benefit) => ({
    id: benefit.id || `benefit-${Math.random().toString(36).substring(2, 11)}`,
    item: benefit.item || '',
  }))

  return {
    id: scholarship.id,
    title: scholarship.title,
    slug: scholarship.slug || '',
    mainImage,
    overview: scholarship.overview,
    eligibility: formattedEligibility,
    awardAmount: scholarship.awardAmount || '',
    howToApply: scholarship.howToApply,
    applicationInfo: scholarship.applicationInfo,
    sidebar: {
      about: scholarship.sidebar?.about || '',
      sponsor: {
        name: scholarship.sidebar?.sponsor?.name || '',
        sponsorLogo: scholarship.sidebar?.sponsor?.sponsorLogo,
      },
      benefits: formattedBenefits,
    },
    meta: {
      relatedScholarships: scholarship.meta?.relatedScholarships || [],
      categories: scholarship.meta?.categories || [],
    },
  }
}

export default async function ScholarshipDetailPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/scholarships/' + slug

  const scholarship = await queryScholarshipBySlug({ slug })

  if (!scholarship) return <PayloadRedirects url={url} />

  // Transform the data before passing to client component
  const scholarshipData = transformScholarshipData(scholarship)

  return (
    <article className="pt-16 pb-16">
      <ScholarshipDetailClient scholarship={scholarshipData} />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const scholarship = await queryScholarshipBySlug({ slug })

  // Create a compatible metadata object that matches what generateMeta expects
  const metaDoc = scholarship
    ? {
        meta: {
          title: scholarship.title,
          description: scholarship.overview ? 'Scholarship details' : undefined,
          image: typeof scholarship.mainImage === 'object' ? scholarship.mainImage : null,
        },
      }
    : null

  return generateMeta({ doc: metaDoc })
}

const queryScholarshipBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const scholarshipQuery = await payload.find({
    collection: 'scholarships',
    where: {
      slug: {
        equals: slug,
      },
    },
    draft,
    depth: 2,
    limit: 1,
  })

  const scholarship = scholarshipQuery.docs[0]
  return scholarship
})
