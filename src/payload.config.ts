// Import Vercel Blob storage adapter for Media collection
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { sqliteAdapter } from '@payloadcms/db-sqlite'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Scholarships } from './collections/scholarships'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: sqliteAdapter({
    client: {
      // Provide a fallback database path for build environments
      // In production, set DATABASE_URI in environment variables
      url: process.env.DATABASE_URI || 'file:./temp-build-database.db',
    },
    // Skip database operations during build process to prevent errors
    // This allows the build to complete without requiring actual database tables
    ...(process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
      ? {
          // Set this to completely disable database operations during build
          disableDB: process.env.VERCEL_ENV === 'preview',
          // Migration directory for actual deployments
          migrationDir: path.resolve(__dirname, './migrations'),
          // Only run migrations in actual deployment, not during build
          runMigrations: false,
        }
      : {}),
  }),
  collections: [Pages, Posts, Media, Categories, Users, Scholarships],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // Add Vercel Blob storage adapter for Media collection
    // This is better integrated with Vercel deployments
    vercelBlobStorage({
      // Only enable in production environments
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.NODE_ENV === 'production'),
      collections: {
        // Match the exact slug from the Media collection
        'media': {
          // Add a prefix to organize uploads in the blob storage
          prefix: 'media',
        },
      },
      // Token is automatically provided by Vercel when Blob storage is added to the project
      // For build time, provide a placeholder that will be replaced in actual deployment
      token: process.env.BLOB_READ_WRITE_TOKEN || 'placeholder-for-build',
      // Enable client-side uploads to bypass Vercel's 4.5MB server upload limit
      clientUploads: true,
    }),
  ].filter(Boolean),
  // Provide a fallback secret for build environments where env vars might not be set
  // In production, always set a proper PAYLOAD_SECRET in environment variables
  secret: process.env.PAYLOAD_SECRET || 'TEMPORARY_FALLBACK_SECRET_FOR_BUILD',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
