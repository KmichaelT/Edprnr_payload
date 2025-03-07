// src/collections/scholarships/hooks/revalidateScholarship.ts
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateScholarship: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/scholarships/${doc.slug}`

      payload.logger.info(`Revalidating scholarship at path: ${path}`)

      revalidatePath(path)
      revalidateTag('scholarships-sitemap')
    }

    // If the scholarship was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/scholarships/${previousDoc.slug}`

      payload.logger.info(`Revalidating old scholarship at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('scholarships-sitemap')
    }
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/scholarships/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('scholarships-sitemap')
  }

  return doc
}
