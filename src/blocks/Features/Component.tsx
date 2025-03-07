'use client'

import React from 'react'
import { MoveRight } from 'lucide-react'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type FeatureItem = {
  title?: string
  content?: DefaultTypedEditorState
  enable_link?: boolean // Changed from enableLink to enable_link
  link?: {
    url?: string
    label?: string
  }
}

export type FeaturesBlockProps = {
  heading?: string
  features?: FeatureItem[]
}

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({ heading, features }) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-4 lg:gap-20">
          <h2 className="row-span-2 text-3xl font-semibold">
            {heading || 'Built by the best and brightest'}
          </h2>

          {features &&
            features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold lg:mb-8">
                    {feature.title || 'Feature Title'}
                  </h3>
                  {feature.content && (
                    <div className="text-muted-foreground">
                      {/* Pass data prop instead of content */}
                      <RichText data={feature.content} className="p-0 m-0" />
                    </div>
                  )}
                </div>
                {feature.enable_link &&
                  feature.link?.url && ( // Changed from enableLink to enable_link
                    <a href={feature.link.url} className="inline-flex items-center hover:underline">
                      <span>{feature.link.label || 'Learn more'}</span>
                      <MoveRight strokeWidth={1} className="ml-2 size-4" />
                    </a>
                  )}
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
