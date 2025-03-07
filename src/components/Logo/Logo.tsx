'use client'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@/providers/Theme'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props
  const { theme } = useTheme()
  // Use absolute URLs with the server URL to ensure logos work in production
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const [logoSrc, setLogoSrc] = useState(`${serverUrl}/media/logo.svg`)

  useEffect(() => {
    setLogoSrc(theme === 'dark' 
      ? `${serverUrl}/media/logo_white.svg` 
      : `${serverUrl}/media/logo.svg`)
  }, [theme, serverUrl])

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Edupreneur Logo"
      width={230}
      height={50}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[12.5rem] w-full h-[50px]', className)}
      src={logoSrc}
    />
  )
}
