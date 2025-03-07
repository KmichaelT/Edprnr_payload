// Import Vercel Blob storage adapter for Media collection
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { postgresAdapter } from '@payloadcms/db-postgres'
// Keep SQLite import for local development fallback
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
  // For build process, completely disable database operations
  // This prevents any database queries during static generation
  db: process.env.PAYLOAD_DISABLE_DB === 'true'
    ? sqliteAdapter({
        // Use in-memory SQLite for build process
        client: 'better-sqlite3',
        filename: ':memory:',
      })
    : process.env.DATABASE_URL
      ? postgresAdapter({
          // Use Postgres in production with Neon database
          pool: {
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production',
            max: 10, // Maximum number of connections in the pool
          },
          migrationDir: path.resolve(__dirname, './migrations'),
        })
      : sqliteAdapter({
          // Fallback to SQLite for local development
          client: {
            url: process.env.DATABASE_URI || 'file:./local-development.db',
          },
        }),
  collections: [Pages, Posts, Media, Categories, Users, Scholarships],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // Add Vercel Blob storage adapter for Media collection
    // This is better integrated with Vercel deployments
    ...(process.env.BLOB_READ_WRITE_TOKEN ? [
      vercelBlobStorage({
        // Only enable when token is available
        enabled: true,
        collections: {
          // Match the exact slug from the Media collection
          'media': {
            // Add a prefix to organize uploads in the blob storage
            prefix: 'media',
          },
        },
        // Token is automatically provided by Vercel when Blob storage is added to the project
        token: process.env.BLOB_READ_WRITE_TOKEN,
        // Enable client-side uploads to bypass Vercel's 4.5MB server upload limit
        clientUploads: true,
      }),
    ] : []),
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
