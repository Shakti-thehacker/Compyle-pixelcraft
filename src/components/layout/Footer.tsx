import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from './ThemeToggle'
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Heart
} from 'lucide-react'

interface FooterProps {
  showThemeToggle?: boolean
  className?: string
}

const socialLinks = [
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
]

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ]
}

export function Footer({ showThemeToggle = true, className }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn('border-t bg-background', className)}>
      <Container size="lg" padding="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl mb-4"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">PC</span>
              </div>
              <span className="text-gradient">PixelCraft</span>
            </Link>

            <p className="text-muted-foreground mb-6 max-w-sm">
              We transform ideas into stunning digital experiences. Your partner in web design, development, and branding excellence.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@pixelcraft-studio.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-lg',
                      'bg-muted hover:bg-primary hover:text-primary-foreground',
                      'transition-all-300 hover-scale'
                    )}
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & CTA */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest updates and exclusive content delivered to your inbox.
            </p>

            <Button className="w-full mb-4" size="sm">
              Subscribe Now
            </Button>

            <p className="text-xs text-muted-foreground">
              Join 500+ subscribers. No spam, unsubscribe anytime.
            </p>

            {/* Theme Toggle (if enabled) */}
            {showThemeToggle && (
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Theme</span>
                  <ThemeToggle variant="dropdown" showLabel={false} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} PixelCraft Studio. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                Made with <Heart className="h-4 w-4 text-destructive fill-current" /> by PixelCraft
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}