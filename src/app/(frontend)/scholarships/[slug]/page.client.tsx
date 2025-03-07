'use client'

import { useEffect } from 'react'
import { CheckCircle2, Facebook, Home, Instagram, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import RichText from '@/components/RichText'

// Type definitions for the API response
interface ScholarshipData {
  id: string | number
  title: string
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
  overview: any
  eligibility: { id: string; item: string }[]
  awardAmount: string
  howToApply: any
  applicationInfo: any
  sidebar: {
    about?: string
    sponsor: {
      name: string
      sponsorLogo?: any
    }
    benefits: { id: string; item: string }[]
  }
  meta: {
    relatedScholarships: any[]
    categories: any[]
  }
  slug: string
}

// Skeleton loader for scholarship details
export const ScholarshipSkeleton = () => (
  <div className="container py-12">
    <div className="mb-8">
      <Skeleton className="h-8 w-3/4 mb-4" />
      <Skeleton className="h-4 w-1/2 mb-2" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-7 md:col-start-5 lg:col-start-6">
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-8" />

        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-8" />
      </div>
      <div className="order-last md:order-none md:col-span-4 lg:col-span-3">
        <Skeleton className="h-64 w-full mb-4" />
        <Skeleton className="h-8 w-2/3 mb-2" />
        <Skeleton className="h-6 w-full mb-8" />

        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
      </div>
    </div>
  </div>
)

interface ScholarshipBlogProps {
  scholarship: ScholarshipData
}

export default function ScholarshipBlog({ scholarship }: ScholarshipBlogProps) {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
    return () => setHeaderTheme('light')
  }, [setHeaderTheme])

  // Get the appropriate image size based on viewport
  const getResponsiveImage = () => {
    if (!scholarship.mainImage) {
      return '/placeholder-scholarship.jpg'
    }

    if (scholarship.mainImage.sizes?.medium) {
      return scholarship.mainImage.sizes.medium.url
    }

    return scholarship.mainImage.url
  }

  return (
    <section className="py-12 md:py-32">
      <div className="container">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center">
                <Home className="h-4 w-4 mr-1" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/scholarships">Scholarships</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{scholarship.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{scholarship.title}</h1>

        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Sidebar */}
          <div className="order-last md:order-none md:col-span-4 lg:col-span-3">
            <aside className="top-32 md:sticky">
              {/* Scholarship Details */}
              <div className="space-y-5 border-b border-border py-5 md:space-y-6 md:py-6">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Scholarship Details
                </span>

                {/* Sponsor */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Sponsor
                  </h4>
                  <div className="flex items-center">
                    {scholarship.sidebar.sponsor.sponsorLogo ? (
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage
                          src={scholarship.sidebar.sponsor.sponsorLogo.url}
                          alt={scholarship.sidebar.sponsor.name}
                        />
                      </Avatar>
                    ) : null}
                    <span className="font-medium">{scholarship.sidebar.sponsor.name}</span>
                  </div>
                </div>

                {/* About */}
                {scholarship.sidebar.about && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      About
                    </h4>
                    <p>{scholarship.sidebar.about}</p>
                  </div>
                )}

                {/* Benefits */}
                {scholarship.sidebar.benefits && scholarship.sidebar.benefits.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Benefits
                    </h4>
                    <ul className="space-y-2">
                      {scholarship.sidebar.benefits.map((benefit) => (
                        <li key={benefit.id} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{benefit.item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Apply Button */}
              <div className="space-y-5 border-b border-border py-5 md:space-y-6 md:py-6">
                <Button className="w-full" size="lg">
                  Apply Now
                </Button>
              </div>

              {/* Share this Scholarship */}
              <div className="space-y-5 border-b border-border py-5 md:space-y-6 md:py-6">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Share this Scholarship
                </span>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon">
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Instagram className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Related Scholarships */}
              {scholarship.meta.relatedScholarships &&
                scholarship.meta.relatedScholarships.length > 0 && (
                  <div className="space-y-5 py-5 md:space-y-6 md:py-6">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Related Scholarships
                    </span>
                    <div className="space-y-4">
                      {scholarship.meta.relatedScholarships.map((related) => (
                        <Link
                          href={`/scholarships/${related.slug}`}
                          key={related.id}
                          className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <h4 className="font-medium">{related.title}</h4>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
            </aside>
          </div>

          {/* Main content */}
          <div className="md:col-span-7 md:col-start-5 lg:col-start-6">
            {/* Main image */}
            {scholarship.mainImage && (
              <div className="relative w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={getResponsiveImage() || '/placeholder.svg'}
                  alt={scholarship.mainImage.alt || scholarship.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}

            <article className="prose prose-sm max-w-none">
              {/* Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Overview</h2>
                {scholarship.overview && (
                  <RichText data={scholarship.overview} enableGutter={false} />
                )}
              </div>

              {/* Eligibility */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Eligibility</h2>
                <ul className="space-y-2">
                  {scholarship.eligibility.map((item) => (
                    <li key={item.id} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item.item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Award Amount */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Award Amount</h2>
                <p className="text-lg">{scholarship.awardAmount}</p>
              </div>

              {/* How to Apply */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold">How to Apply</h2>
                {scholarship.howToApply && (
                  <RichText data={scholarship.howToApply} enableGutter={false} />
                )}
              </div>

              {/* Application Info */}
              {scholarship.applicationInfo && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold">Application Information</h2>
                  <RichText data={scholarship.applicationInfo} enableGutter={false} />
                </div>
              )}
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
