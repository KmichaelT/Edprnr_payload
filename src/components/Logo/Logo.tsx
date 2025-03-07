'use client'
import clsx from 'clsx'
import React from 'react'
import { useTheme } from '@/providers/Theme'
import { LogoLight, LogoDark } from './LogoSVG'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props
  const { theme } = useTheme()

  return (
    <div className={clsx('max-w-[12.5rem] w-full h-[50px]', className)}>
      {theme === 'dark' ? <LogoDark /> : <LogoLight />}
    </div>
  )
}
