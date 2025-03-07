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
  const [logoSrc, setLogoSrc] = useState('/media/logo.svg')

  useEffect(() => {
    setLogoSrc(theme === 'dark' ? '/media/logo_white.svg' : '/media/logo.svg')
  }, [theme])

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
