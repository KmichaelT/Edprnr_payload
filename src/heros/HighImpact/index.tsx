'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  heading,
  subheading,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 md:gap-20 lg:flex-row lg:items-center">
          <h1 className="text-6xl font-bold leading-none tracking-tighter md:text-[8vw] lg:w-3/5 2xl:text-9xl">
            {heading || (
              <>
                HIGH
                <br />
                SCALE
                <br />
                HEADING.
              </>
            )}
          </h1>
          <div className="lg:max-w-auto max-w-lg space-y-4 lg:mb-4 lg:w-2/5">
            <p className="text-xl font-bold md:text-4xl">{subheading || ''}</p>
            <div className="text-lg text-muted-foreground">
              {richText ? (
                <RichText data={richText} enableGutter={false} />
              ) : (
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, optio quis? Veniam accusamus quaerat illum dolorem eos atque reiciendis numquam. Veniam accusamus quaerat illum'
              )}
            </div>
            {Array.isArray(links) && links.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-4">
                {links.map(
                  (linkItem, index) =>
                    linkItem?.link && (
                      <CMSLink key={index} {...linkItem.link} className="inline-block" />
                    ),
                )}
              </div>
            ) : (
              <Button className="mt-6 p-10" size="lg">
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
