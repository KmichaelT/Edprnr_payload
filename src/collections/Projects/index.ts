// src/collections/Projects/index.ts
import { CollectionConfig } from 'payload'

const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'organization',
      type: 'text',
    },
    {
      name: 'date',
      type: 'text',
      admin: {
        description: 'The date or timeframe of the project',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Planning',
          value: 'planning',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
      ],
      defaultValue: 'active',
    },
    {
      name: 'teamSize',
      type: 'number',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'skillRequirements',
      type: 'select',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Planning',
          value: 'planning',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
      ],
      defaultValue: 'active',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'requirements',
      type: 'array',
      fields: [
        {
          name: 'requirement',
          type: 'richText',
        },
      ],
    },
    {
      name: 'implementationSteps',
      type: 'array',
      fields: [
        {
          name: 'step',
          type: 'richText',
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            if (data?.title) return data.title.toLowerCase().replace(/ /g, '-')
            return undefined
          },
        ],
      },
    },
  ],
}

export default Projects
