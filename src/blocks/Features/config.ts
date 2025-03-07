import type { Block } from 'payload' // Removed unused Field import
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Check what features are available in your project
// If you don't have these features, use a simpler editor configuration
export const FeaturesBlock: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      defaultValue: 'Built by the best and brightest',
    },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
        },
        {
          name: 'content',
          label: 'Content',
          type: 'richText',
          editor: lexicalEditor({}), // Simplified editor config
        },
        {
          name: 'enable_link',
          type: 'checkbox',
          label: 'Enable Link',
        },
        {
          type: 'group',
          name: 'link',
          label: 'Link',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.enableLink),
          },
          fields: [
            {
              name: 'url',
              label: 'URL',
              type: 'text',
            },
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              defaultValue: 'Learn more',
            },
          ],
        },
      ],
    },
  ],
}
