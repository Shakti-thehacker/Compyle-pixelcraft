import { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import {
  ArrowRight,
  Star,
  Clock,
  Users,
  TrendingUp,
  Play,
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Home - PixelCraft Studio',
  description: 'Transform your ideas into stunning digital experiences. Professional web design, development, and branding services that drive results.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation variant="core" />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/20">
          <Container size="xl" padding="lg">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] py-20">
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient">
                    Transform Ideas Into
                    <br />
                    Digital Excellence
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    We craft stunning websites, powerful applications, and memorable brand experiences that drive your business forward. Your vision, our expertise.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/order">
                    <Button size="lg" className="w-full sm:w-auto">
                      Start Your Project
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/projects">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      <Play className="mr-2 h-5 w-5" />
                      View Our Work
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">150+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">5+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                </div>
              </div>

              {/* Hero Image/Visual */}
              <div className="relative lg:h-[600px] flex items-center justify-center">
                <div className="relative w-full max-w-md mx-auto">
                  {/* Placeholder for hero visual */}
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center border border-border">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-primary rounded-xl mx-auto flex items-center justify-center">
                        <span className="text-3xl">🎨</span>
                      </div>
                      <p className="text-foreground font-semibold">Your Digital Partner</p>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-lg animate-pulse" />
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/30 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Featured Projects */}
        <section className="py-20 bg-background">
          <Container size="xl" padding="lg">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover our latest work and see how we've helped businesses transform their digital presence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project Card 1 */}
              <Card hover className="overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">🛒</span>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="/projects">
                      <Button variant="secondary">View Project</Button>
                    </Link>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      E-commerce
                    </span>
                    <span className="text-xs text-muted-foreground">Jan 2024</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Modern E-commerce Platform</h3>
                  <p className="text-muted-foreground mb-4">
                    Fully responsive online store with advanced filtering and seamless checkout experience.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">TechStore Inc.</span>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-muted text-xs rounded">React</span>
                      <span className="px-2 py-1 bg-muted text-xs rounded">Next.js</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Card 2 */}
              <Card hover className="overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">🎨</span>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="/projects">
                      <Button variant="secondary">View Project</Button>
                    </Link>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      Branding
                    </span>
                    <span className="text-xs text-muted-foreground">Feb 2024</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Brand Identity Design</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete brand identity redesign including logo, color palette, and marketing materials.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">StartupCo</span>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-muted text-xs rounded">Figma</span>
                      <span className="px-2 py-1 bg-muted text-xs rounded">Adobe</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Card 3 */}
              <Card hover className="overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">📱</span>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="/projects">
                      <Button variant="secondary">View Project</Button>
                    </Link>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      Mobile
                    </span>
                    <span className="text-xs text-muted-foreground">Mar 2024</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Mobile Banking App</h3>
                  <p className="text-muted-foreground mb-4">
                    Secure and intuitive mobile banking application with biometric authentication.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">FinanceBank</span>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-muted text-xs rounded">React Native</span>
                      <span className="px-2 py-1 bg-muted text-xs rounded">Node.js</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link href="/projects">
                <Button variant="outline" size="lg">
                  View All Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Testimonials Teaser */}
        <section className="py-20 bg-accent/5">
          <Container size="xl" padding="lg">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Don't just take our word for it – hear from businesses we've helped transform
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Testimonial 1 */}
              <Card className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "PixelCraft delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and user experience design resulted in a significant increase in conversions."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">SJ</span>
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">TechStore Inc.</div>
                  </div>
                </div>
              </Card>

              {/* Testimonial 2 */}
              <Card className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "The brand identity they created for us perfectly captures our company's essence. We've received countless compliments on our new look and feel."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">MC</span>
                  </div>
                  <div>
                    <div className="font-semibold">Michael Chen</div>
                    <div className="text-sm text-muted-foreground">StartupCo</div>
                  </div>
                </div>
              </Card>

              {/* Testimonial 3 */}
              <Card className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "Professional, responsive, and incredibly talented. They turned our complex requirements into a sleek, user-friendly application that our customers love."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">EP</span>
                  </div>
                  <div>
                    <div className="font-semibold">Emily Parker</div>
                    <div className="text-sm text-muted-foreground">FinanceBank</div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/testimonials">
                <Button size="lg">
                  View All Reviews
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <Container size="lg" padding="lg">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Let's discuss your project and create something amazing together. From concept to launch, we're here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/order">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Start Your Project
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}