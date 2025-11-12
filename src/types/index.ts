// Core type definitions for the portfolio website

export interface Project {
  id: string
  title: string
  description: string
  category: 'web-design' | 'development' | 'branding' | 'marketing' | 'mobile'
  thumbnail: string
  images: string[]
  technologies: string[]
  client: string
  completedDate: string
  featured: boolean
  status: 'completed' | 'in-progress' | 'planned'
  url?: string
  githubUrl?: string
  caseStudy?: {
    challenge: string
    solution: string
    results: string
    metrics?: {
      trafficIncrease?: number
      conversionRate?: number
      roi?: number
    }
  }
}

export interface Testimonial {
  id: string
  clientName: string
  company?: string
  email: string
  rating: number
  text: string
  projectType: string
  approved: boolean
  featured: boolean
  createdAt: string
  projectTitle?: string
  avatar?: string
  verified: boolean
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  featuredImage: string
  category: 'case-study' | 'tutorial' | 'update' | 'insight'
  tags: string[]
  author: {
    name: string
    avatar: string
    bio: string
  }
  publishedAt: string
  updatedAt: string
  readingTime: number
  featured: boolean
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'services' | 'process' | 'technical' | 'billing' | 'general'
  helpful: number
  notHelpful: number
  order: number
  relatedQuestions: string[]
}

export interface Service {
  id: string
  name: string
  description: string
  longDescription: string
  icon: string
  features: string[]
  startingPrice: number
  deliveryTime: string
  included: string[]
  optional: string[]
  category: string
  popular?: boolean
}

export interface Order {
  id: string
  clientInfo: {
    name: string
    email: string
    phone: string
    company?: string
  }
  projectDetails: {
    type: string
    description: string
    budget: string
    timeline: string
    requirements: string[]
  }
  services: {
    selectedService: string
    customizations: string[]
    totalPrice: number
  }
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  timeline: {
    start: string
    deadline: string
    completed?: string
  }
  payment: {
    method: string
    status: 'pending' | 'paid' | 'refunded'
    amount: number
    transactionId?: string
  }
  createdAt: string
  updatedAt: string
  notes: string[]
  files: string[]
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  source: 'contact-form' | 'service-inquiry' | 'general'
  status: 'new' | 'responded' | 'archived'
  createdAt: string
  respondedAt?: string
  notes?: string
}

export interface AdminUser {
  username: string
  hashedPassword: string
  email: string
  role: 'admin' | 'moderator'
  permissions: string[]
  lastLogin?: string
  loginAttempts: number
  lockedUntil?: string
}

export interface AdminSession {
  token: string
  expires: number
  rememberMe: boolean
  lastActivity: number
}

export interface SiteSettings {
  contact: {
    email: string
    phone: string
    address: string
    hours: string
  }
  social: {
    linkedin: string
    twitter: string
    instagram: string
    github: string
    dribbble: string
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  features: {
    maintenance: boolean
    newOrders: boolean
    testimonials: boolean
    blog: boolean
  }
  analytics: {
    googleAnalyticsId?: string
    googleTagManagerId?: string
  }
}

export interface NewsletterSubscription {
  id: string
  email: string
  preferences: string[]
  status: 'active' | 'unsubscribed'
  subscribedAt: string
  unsubscribedAt?: string
}

export interface NavigationItem {
  name: string
  href: string
  icon?: string
  badge?: string
  external?: boolean
  children?: NavigationItem[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
}

export interface OrderFormData {
  // Step 1: Project Details
  projectType: string
  projectDescription: string
  budget: string
  timeline: string
  requirements: string[]

  // Step 2: Service Selection
  selectedService: string
  customizations: string[]

  // Step 3: Contact Information
  clientName: string
  clientEmail: string
  clientPhone: string
  company?: string

  // Step 4: Additional Info
  additionalRequirements: string
  referenceLinks: string[]
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Component props types
export interface ComponentBaseProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends ComponentBaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  onClick?: () => void
}

export interface CardProps extends ComponentBaseProps {
  hover?: boolean
  interactive?: boolean
  padding?: 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
}

export interface ModalProps extends ComponentBaseProps {
  isOpen: boolean
  onClose: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
  title?: string
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
}

export interface ToastProps {
  id?: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// Context types
export interface ThemeContextType {
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  resolvedTheme: 'light' | 'dark'
}

export interface SiteDataContextType {
  projects: Project[]
  testimonials: Testimonial[]
  blogPosts: BlogPost[]
  faqItems: FAQItem[]
  services: Service[]
  orders: Order[]
  contactSubmissions: ContactSubmission[]
  siteSettings: SiteSettings
  loading: boolean
  error: string | null
  refresh: () => void
}

export interface AdminContextType {
  user: AdminUser | null
  session: AdminSession | null
  isAuthenticated: boolean
  login: (username: string, password: string, rememberMe?: boolean) => Promise<boolean>
  logout: () => void
  updateSession: () => void
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
}