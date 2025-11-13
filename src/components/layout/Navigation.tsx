'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/Button'
import { NavigationItem } from '@/types'
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Wrench,
  ShoppingCart,
  Phone,
  BookOpen,
  HelpCircle,
  Shield,
  ChevronDown
} from 'lucide-react'

interface NavigationProps {
  variant?: 'core' | 'extended' | 'minimal'
  showThemeToggle?: boolean
  className?: string
}

const navigationItems: Record<string, NavigationItem[]> = {
  core: [
    { name: 'Home', href: '/', icon: 'Home' },
    { name: 'About', href: '/about', icon: 'User' },
    { name: 'Projects', href: '/projects', icon: 'Briefcase' },
    { name: 'Services', href: '/services', icon: 'Wrench' },
    { name: 'Order', href: '/order', icon: 'ShoppingCart' },
    { name: 'Contact', href: '/contact', icon: 'Phone' },
  ],
  extended: [
    { name: 'Blog', href: '/blog', icon: 'BookOpen' },
    { name: 'FAQ', href: '/faq', icon: 'HelpCircle' },
    { name: 'Privacy', href: '/privacy', icon: 'Shield' },
  ]
}

const iconMap = {
  Home,
  User,
  Briefcase,
  Wrench,
  ShoppingCart,
  Phone,
  BookOpen,
  HelpCircle,
  Shield,
  ChevronDown
}

export function Navigation({ variant = 'core', showThemeToggle = true, className }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle click outside mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Determine which navigation items to show
  const getNavItems = () => {
    const items = [...navigationItems.core]
    if (variant === 'extended') {
      items.push(...navigationItems.extended)
    }
    return items
  }

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const renderNavLink = (item: NavigationItem, isMobile = false) => {
    const isActive = isActiveLink(item.href)
    const Icon = item.icon ? iconMap[item.icon as keyof typeof iconMap] : null

    if (isMobile) {
      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setIsMenuOpen(false)}
          className={cn(
            'flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            isActive
              ? 'bg-accent text-accent-foreground border-l-4 border-primary'
              : 'text-foreground'
          )}
        >
          {Icon && <Icon className="h-5 w-5" />}
          {item.name}
          {item.badge && (
            <span className="ml-auto px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
              {item.badge}
            </span>
          )}
        </Link>
      )
    }

    return (
      <Link
        key={item.name}
        href={item.href}
        className={cn(
          'relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all-300',
          'hover:text-primary hover-lift',
          isActive
            ? 'text-primary'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {item.name}
        {isActive && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-fade-in" />
        )}
        {item.badge && (
          <span className="absolute -top-1 -right-2 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
            {item.badge}
          </span>
        )}
      </Link>
    )
  }

  const navClasses = cn(
    'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all-300',
    isScrolled && 'shadow-md',
    className
  )

  return (
    <nav className={navClasses}>
      <div className="container-narrow mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">PC</span>
            </div>
            <span className="hidden sm:inline text-gradient">PixelCraft</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {getNavItems().map((item) => renderNavLink(item))}
            </div>

            {/* Theme Toggle */}
            {showThemeToggle && (
              <div className="flex items-center gap-4">
                <ThemeToggle />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {showThemeToggle && <ThemeToggle />}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden border-t bg-background animate-slide-in"
          >
            <div className="px-2 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {getNavItems().map((item) => renderNavLink(item, true))}

              {/* Additional mobile menu items */}
              <div className="border-t pt-4 mt-4 space-y-1">
                <Link
                  href="/testimonials"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                >
                  <span className="h-5 w-5">⭐</span>
                  Testimonials
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}