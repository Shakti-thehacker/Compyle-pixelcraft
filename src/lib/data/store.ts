'use client'

import { storage, subscribeToStorageChanges } from '../utils/storage'
import {
  Project,
  Testimonial,
  BlogPost,
  FAQItem,
  Service,
  Order,
  ContactSubmission,
  SiteSettings,
  AdminUser,
  AdminSession,
  NewsletterSubscription
} from '@/types'
import { v4 as uuidv4 } from 'uuid'

// Storage keys
const STORAGE_KEYS = {
  PROJECTS: 'pixelcraft_projects',
  TESTIMONIALS: 'pixelcraft_testimonials',
  BLOG_POSTS: 'pixelcraft_blog_posts',
  FAQ_ITEMS: 'pixelcraft_faq_items',
  SERVICES: 'pixelcraft_services',
  ORDERS: 'pixelcraft_orders',
  CONTACT_SUBMISSIONS: 'pixelcraft_contact_submissions',
  SITE_SETTINGS: 'pixelcraft_site_settings',
  ADMIN_USER: 'pixelcraft_admin_user',
  ADMIN_SESSION: 'pixelcraft_admin_session',
  NEWSLETTER_SUBSCRIPTIONS: 'pixelcraft_newsletter_subscriptions',
} as const

// Default data
const DEFAULT_PROJECTS: Project[] = [
  {
    id: uuidv4(),
    title: 'Modern E-commerce Platform',
    description: 'A fully responsive e-commerce solution with advanced filtering and payment integration.',
    category: 'development',
    thumbnail: '/images/projects/ecommerce-thumb.jpg',
    images: ['/images/projects/ecommerce-1.jpg', '/images/projects/ecommerce-2.jpg'],
    technologies: ['React', 'Next.js', 'Stripe', 'Tailwind CSS'],
    client: 'TechStore Inc.',
    completedDate: '2024-01-15',
    featured: true,
    status: 'completed',
    url: 'https://techstore.example.com',
    caseStudy: {
      challenge: 'Client needed a modern e-commerce platform with advanced filtering and seamless checkout experience.',
      solution: 'Built a responsive Next.js application with React, integrated Stripe payments, and implemented real-time inventory management.',
      results: 'Increased conversion rate by 35%, reduced page load time by 50%, and improved mobile user experience.',
      metrics: {
        trafficIncrease: 45,
        conversionRate: 35,
        roi: 250
      }
    }
  },
  {
    id: uuidv4(),
    title: 'Brand Identity Design',
    description: 'Complete brand identity redesign including logo, color palette, and marketing materials.',
    category: 'branding',
    thumbnail: '/images/projects/branding-thumb.jpg',
    images: ['/images/projects/branding-1.jpg', '/images/projects/branding-2.jpg'],
    technologies: ['Figma', 'Adobe Illustrator', 'Photoshop'],
    client: 'StartupCo',
    completedDate: '2024-02-20',
    featured: true,
    status: 'completed'
  }
]

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: uuidv4(),
    clientName: 'Sarah Johnson',
    company: 'TechStore Inc.',
    email: 'sarah@techstore.com',
    rating: 5,
    text: 'PixelCraft delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and user experience design resulted in a significant increase in conversions.',
    projectType: 'Web Development',
    approved: true,
    featured: true,
    createdAt: '2024-01-20',
    projectTitle: 'Modern E-commerce Platform',
    verified: true
  }
]

const DEFAULT_SERVICES: Service[] = [
  {
    id: uuidv4(),
    name: 'Web Design',
    description: 'Custom website design tailored to your brand and business needs.',
    longDescription: 'Our web design service creates stunning, user-friendly websites that capture your brand essence and drive business results. We focus on responsive design, intuitive navigation, and conversion optimization.',
    icon: 'palette',
    features: ['Custom Design', 'Responsive Layout', 'SEO Optimized', 'Fast Loading'],
    startingPrice: 2999,
    deliveryTime: '2-3 weeks',
    included: ['Homepage Design', 'Inner Pages', 'Mobile Version', 'Source Files'],
    optional: ['Content Creation', 'Logo Design', 'Stock Photos'],
    category: 'design',
    popular: true
  },
  {
    id: uuidv4(),
    name: 'Web Development',
    description: 'Full-stack web development using modern technologies and best practices.',
    longDescription: 'We build robust, scalable web applications using cutting-edge technologies. From simple websites to complex web apps, we ensure clean code, optimal performance, and seamless user experiences.',
    icon: 'code',
    features: ['Custom Development', 'Database Integration', 'API Development', 'Testing'],
    startingPrice: 4999,
    deliveryTime: '3-4 weeks',
    included: ['Frontend Development', 'Backend Development', 'Database Setup', 'Deployment'],
    optional: ['CMS Integration', 'E-commerce', 'Third-party Integrations', 'Maintenance'],
    category: 'development'
  }
]

const DEFAULT_FAQ_ITEMS: FAQItem[] = [
  {
    id: uuidv4(),
    question: 'What is your typical project timeline?',
    answer: 'Project timelines vary based on complexity and scope. A simple website typically takes 2-3 weeks, while complex web applications may take 2-3 months. We provide detailed timelines during the initial consultation.',
    category: 'process',
    helpful: 15,
    notHelpful: 2,
    order: 1,
    relatedQuestions: []
  },
  {
    id: uuidv4(),
    question: 'Do you offer ongoing maintenance and support?',
    answer: 'Yes, we offer comprehensive maintenance packages that include regular updates, security monitoring, performance optimization, and technical support. Packages can be customized based on your specific needs.',
    category: 'services',
    helpful: 12,
    notHelpful: 1,
    order: 2,
    relatedQuestions: []
  }
]

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  contact: {
    email: 'hello@pixelcraft-studio.com',
    phone: '+1 (555) 123-4567',
    address: '123 Design Street, San Francisco, CA 94102',
    hours: 'Mon-Fri: 9AM-6PM PST'
  },
  social: {
    linkedin: 'https://linkedin.com/company/pixelcraft-studio',
    twitter: 'https://twitter.com/pixelcraft_studio',
    instagram: 'https://instagram.com/pixelcraft_studio',
    github: 'https://github.com/pixelcraft-studio',
    dribbble: 'https://dribbble.com/pixelcraft-studio'
  },
  seo: {
    title: 'PixelCraft Studio - Creative Digital Agency',
    description: 'Professional digital agency specializing in web design, development, and branding solutions.',
    keywords: ['web design', 'development', 'branding', 'digital agency', 'portfolio']
  },
  features: {
    maintenance: false,
    newOrders: true,
    testimonials: true,
    blog: true
  },
  analytics: {
    googleAnalyticsId: '',
    googleTagManagerId: ''
  }
}

// Data access functions
export const dataStore = {
  // Projects
  getProjects(): Project[] {
    return storage.get(STORAGE_KEYS.PROJECTS) || DEFAULT_PROJECTS
  },

  saveProjects(projects: Project[]): boolean {
    return storage.set(STORAGE_KEYS.PROJECTS, projects)
  },

  addProject(project: Omit<Project, 'id'>): Project | null {
    const projects = this.getProjects()
    const newProject = { ...project, id: uuidv4() }
    projects.push(newProject)
    return this.saveProjects(projects) ? newProject : null
  },

  updateProject(id: string, updates: Partial<Project>): Project | null {
    const projects = this.getProjects()
    const index = projects.findIndex(p => p.id === id)
    if (index === -1) return null

    projects[index] = { ...projects[index], ...updates }
    return this.saveProjects(projects) ? projects[index] : null
  },

  deleteProject(id: string): boolean {
    const projects = this.getProjects()
    const filteredProjects = projects.filter(p => p.id !== id)
    return this.saveProjects(filteredProjects)
  },

  // Testimonials
  getTestimonials(): Testimonial[] {
    return storage.get(STORAGE_KEYS.TESTIMONIALS) || DEFAULT_TESTIMONIALS
  },

  saveTestimonials(testimonials: Testimonial[]): boolean {
    return storage.set(STORAGE_KEYS.TESTIMONIALS, testimonials)
  },

  addTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt'>): Testimonial | null {
    const testimonials = this.getTestimonials()
    const newTestimonial = { ...testimonial, id: uuidv4(), createdAt: new Date().toISOString() }
    testimonials.push(newTestimonial)
    return this.saveTestimonials(testimonials) ? newTestimonial : null
  },

  updateTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
    const testimonials = this.getTestimonials()
    const index = testimonials.findIndex(t => t.id === id)
    if (index === -1) return null

    testimonials[index] = { ...testimonials[index], ...updates }
    return this.saveTestimonials(testimonials) ? testimonials[index] : null
  },

  // Services
  getServices(): Service[] {
    return storage.get(STORAGE_KEYS.SERVICES) || DEFAULT_SERVICES
  },

  saveServices(services: Service[]): boolean {
    return storage.set(STORAGE_KEYS.SERVICES, services)
  },

  // FAQ Items
  getFAQItems(): FAQItem[] {
    return storage.get(STORAGE_KEYS.FAQ_ITEMS) || DEFAULT_FAQ_ITEMS
  },

  saveFAQItems(items: FAQItem[]): boolean {
    return storage.set(STORAGE_KEYS.FAQ_ITEMS, items)
  },

  // Orders
  getOrders(): Order[] {
    return storage.get(STORAGE_KEYS.ORDERS) || []
  },

  saveOrders(orders: Order[]): boolean {
    return storage.set(STORAGE_KEYS.ORDERS, orders)
  },

  addOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order | null {
    const orders = this.getOrders()
    const now = new Date().toISOString()
    const newOrder = { ...order, id: uuidv4(), createdAt: now, updatedAt: now }
    orders.push(newOrder)
    return this.saveOrders(orders) ? newOrder : null
  },

  updateOrder(id: string, updates: Partial<Order>): Order | null {
    const orders = this.getOrders()
    const index = orders.findIndex(o => o.id === id)
    if (index === -1) return null

    orders[index] = { ...orders[index], ...updates, updatedAt: new Date().toISOString() }
    return this.saveOrders(orders) ? orders[index] : null
  },

  // Contact Submissions
  getContactSubmissions(): ContactSubmission[] {
    return storage.get(STORAGE_KEYS.CONTACT_SUBMISSIONS) || []
  },

  saveContactSubmissions(submissions: ContactSubmission[]): boolean {
    return storage.set(STORAGE_KEYS.CONTACT_SUBMISSIONS, submissions)
  },

  addContactSubmission(submission: Omit<ContactSubmission, 'id' | 'createdAt'>): ContactSubmission | null {
    const submissions = this.getContactSubmissions()
    const newSubmission = { ...submission, id: uuidv4(), createdAt: new Date().toISOString() }
    submissions.push(newSubmission)
    return this.saveContactSubmissions(submissions) ? newSubmission : null
  },

  // Site Settings
  getSiteSettings(): SiteSettings {
    return storage.get(STORAGE_KEYS.SITE_SETTINGS) || DEFAULT_SITE_SETTINGS
  },

  saveSiteSettings(settings: SiteSettings): boolean {
    return storage.set(STORAGE_KEYS.SITE_SETTINGS, settings)
  },

  // Admin
  getAdminUser(): AdminUser | null {
    return storage.get(STORAGE_KEYS.ADMIN_USER)
  },

  saveAdminUser(user: AdminUser): boolean {
    return storage.set(STORAGE_KEYS.ADMIN_USER, user)
  },

  getAdminSession(): AdminSession | null {
    return storage.get(STORAGE_KEYS.ADMIN_SESSION)
  },

  saveAdminSession(session: AdminSession): boolean {
    return storage.set(STORAGE_KEYS.ADMIN_SESSION, session)
  },

  clearAdminSession(): boolean {
    return storage.remove(STORAGE_KEYS.ADMIN_SESSION)
  },

  // Newsletter
  getNewsletterSubscriptions(): NewsletterSubscription[] {
    return storage.get(STORAGE_KEYS.NEWSLETTER_SUBSCRIPTIONS) || []
  },

  saveNewsletterSubscriptions(subscriptions: NewsletterSubscription[]): boolean {
    return storage.set(STORAGE_KEYS.NEWSLETTER_SUBSCRIPTIONS, subscriptions)
  },

  addNewsletterSubscription(email: string, preferences: string[] = []): NewsletterSubscription | null {
    const subscriptions = this.getNewsletterSubscriptions()

    // Check if already subscribed
    if (subscriptions.some(sub => sub.email === email && sub.status === 'active')) {
      return null
    }

    const newSubscription: NewsletterSubscription = {
      id: uuidv4(),
      email,
      preferences,
      status: 'active',
      subscribedAt: new Date().toISOString()
    }

    subscriptions.push(newSubscription)
    return this.saveNewsletterSubscriptions(subscriptions) ? newSubscription : null
  },

  // Utility functions
  clearAllData(): boolean {
    try {
      Object.values(STORAGE_KEYS).forEach(key => storage.remove(key))
      return true
    } catch (error) {
      console.error('Error clearing all data:', error)
      return false
    }
  },

  exportData(): string {
    const data = {
      projects: this.getProjects(),
      testimonials: this.getTestimonials(),
      services: this.getServices(),
      faqItems: this.getFAQItems(),
      orders: this.getOrders(),
      contactSubmissions: this.getContactSubmissions(),
      siteSettings: this.getSiteSettings(),
      newsletterSubscriptions: this.getNewsletterSubscriptions(),
      exportedAt: new Date().toISOString()
    }
    return JSON.stringify(data, null, 2)
  },

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData)

      if (data.projects) this.saveProjects(data.projects)
      if (data.testimonials) this.saveTestimonials(data.testimonials)
      if (data.services) this.saveServices(data.services)
      if (data.faqItems) this.saveFAQItems(data.faqItems)
      if (data.orders) this.saveOrders(data.orders)
      if (data.contactSubmissions) this.saveContactSubmissions(data.contactSubmissions)
      if (data.siteSettings) this.saveSiteSettings(data.siteSettings)
      if (data.newsletterSubscriptions) this.saveNewsletterSubscriptions(data.newsletterSubscriptions)

      return true
    } catch (error) {
      console.error('Error importing data:', error)
      return false
    }
  }
}

// Initialize default data if not present
export function initializeData() {
  if (typeof window === 'undefined') return

  // Initialize default data only if storage is empty
  if (!storage.exists(STORAGE_KEYS.PROJECTS)) {
    dataStore.saveProjects(DEFAULT_PROJECTS)
  }

  if (!storage.exists(STORAGE_KEYS.TESTIMONIALS)) {
    dataStore.saveTestimonials(DEFAULT_TESTIMONIALS)
  }

  if (!storage.exists(STORAGE_KEYS.SERVICES)) {
    dataStore.saveServices(DEFAULT_SERVICES)
  }

  if (!storage.exists(STORAGE_KEYS.FAQ_ITEMS)) {
    dataStore.saveFAQItems(DEFAULT_FAQ_ITEMS)
  }

  if (!storage.exists(STORAGE_KEYS.SITE_SETTINGS)) {
    dataStore.saveSiteSettings(DEFAULT_SITE_SETTINGS)
  }
}