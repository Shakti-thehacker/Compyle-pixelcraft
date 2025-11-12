import { Metadata } from 'next'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import {
  Users,
  Target,
  Zap,
  Shield,
  Award,
  Heart,
  Rocket,
  Lightbulb,
  CheckCircle,
  Calendar,
  TrendingUp
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - PixelCraft Studio',
  description: 'Learn about our journey, team, and the values that drive us to create exceptional digital experiences for our clients.',
}

export default function AboutPage() {
  const milestones = [
    {
      year: '2019',
      title: 'Studio Founded',
      description: 'Started with a vision to transform digital experiences',
      icon: Rocket
    },
    {
      year: '2020',
      title: 'First Major Client',
      description: 'Landed our first enterprise partnership',
      icon: Users
    },
    {
      year: '2021',
      title: 'Team Expansion',
      description: 'Grew to a team of 10 talented professionals',
      icon: TrendingUp
    },
    {
      year: '2023',
      title: '150+ Projects',
      description: 'Successfully delivered over 150 projects worldwide',
      icon: Award
    }
  ]

  const skills = [
    { name: 'Web Design', level: 95, color: 'bg-blue-500' },
    { name: 'React/Next.js', level: 90, color: 'bg-cyan-500' },
    { name: 'UI/UX Design', level: 88, color: 'bg-purple-500' },
    { name: 'Branding', level: 85, color: 'bg-pink-500' },
    { name: 'Mobile Development', level: 82, color: 'bg-green-500' },
    { name: 'Backend Development', level: 78, color: 'bg-orange-500' },
    { name: 'SEO Optimization', level: 85, color: 'bg-red-500' },
    { name: 'Performance', level: 92, color: 'bg-indigo-500' }
  ]

  const teamMembers = [
    {
      name: 'Alex Thompson',
      role: 'Founder & Creative Director',
      bio: 'With over 10 years of experience in digital design and development, Alex leads our creative vision and ensures every project exceeds expectations.',
      avatar: 'AT',
      skills: ['UI/UX Design', 'Creative Strategy', 'Team Leadership'],
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Sarah Chen',
      role: 'Lead Developer',
      bio: 'Full-stack developer with expertise in React, Node.js, and cloud architecture. Sarah turns complex ideas into scalable, performant applications.',
      avatar: 'SC',
      skills: ['React', 'Node.js', 'Cloud Architecture'],
      social: { linkedin: '#', github: '#' }
    },
    {
      name: 'Michael Rodriguez',
      role: 'Brand Strategist',
      bio: 'Marketing and branding expert who helps businesses discover their unique voice and connect with their target audience effectively.',
      avatar: 'MR',
      skills: ['Brand Strategy', 'Marketing', 'Content Design'],
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Emily Watson',
      role: 'UX Designer',
      bio: 'Passionate about creating intuitive, user-centered designs that delight users and drive business results.',
      avatar: 'EW',
      skills: ['User Research', 'Prototyping', 'Design Systems'],
      social: { linkedin: '#', dribbble: '#' }
    }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Client-Centric',
      description: 'We put our clients at the center of everything we do, ensuring their success is our top priority.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly explore new technologies and creative approaches to deliver cutting-edge solutions.'
    },
    {
      icon: Shield,
      title: 'Quality',
      description: 'Every project undergoes rigorous quality assurance to ensure excellence in every detail.'
    },
    {
      icon: Zap,
      title: 'Efficiency',
      description: 'We optimize our processes to deliver high-quality work within realistic timelines.'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We focus on delivering measurable results that help our clients achieve their business goals.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our work, from initial concept to final delivery.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation variant="core" />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-background to-accent/20">
          <Container size="lg" padding="lg">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient">
                Crafting Digital Excellence
                <br />
                Since 2019
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're a passionate team of designers, developers, and strategists dedicated to transforming ideas into exceptional digital experiences. Our journey is driven by creativity, innovation, and a relentless pursuit of excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <Users className="mr-2 h-5 w-5" />
                  Meet Our Team
                </Button>
                <Button variant="outline" size="lg">
                  <Calendar className="mr-2 h-5 w-5" />
                  View Our Journey
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Studio Story */}
        <section className="py-20 bg-background">
          <Container size="lg" padding="lg">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
                  <p className="text-lg text-muted-foreground">
                    PixelCraft began as a small studio with a big dream: to bridge the gap between creative vision and technical excellence. What started in a humble workspace has grown into a full-service digital agency trusted by clients worldwide.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Over the years, we've had the privilege of working with startups, established businesses, and everything in between. Each project has taught us something new and helped us refine our craft.
                  </p>
                  <p className="text-muted-foreground">
                    Today, we're proud to be a team of creative professionals who are passionate about pushing boundaries and delivering results that matter. Our commitment to quality and innovation remains stronger than ever.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">150+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">15+</div>
                    <div className="text-sm text-muted-foreground">Team Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">5+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                </div>
              </div>

              {/* Visual Element */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-primary rounded-2xl mx-auto flex items-center justify-center">
                      <span className="text-4xl">🎨</span>
                    </div>
                    <p className="text-foreground font-semibold">Creative Excellence</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-accent rounded-lg animate-pulse" />
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/30 rounded-full animate-bounce" />
              </div>
            </div>
          </Container>
        </section>

        {/* Milestones Timeline */}
        <section className="py-20 bg-accent/5">
          <Container size="lg" padding="lg">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Our Journey</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Key milestones that shaped our growth and defined our commitment to excellence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon
                return (
                  <Card key={index} className="text-center hover-lift">
                    <CardContent className="p-6 space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </Container>
        </section>

        {/* Skills & Expertise */}
        <section className="py-20 bg-background">
          <Container size="lg" padding="lg">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Our Expertise</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Skills and technologies we master to deliver exceptional results
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ease-out ${skill.color}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-8 space-y-6">
                    <h3 className="text-2xl font-semibold">Why Choose Us?</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Expert Team</h4>
                          <p className="text-sm text-muted-foreground">
                            Experienced professionals dedicated to your success
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Quality Assurance</h4>
                          <p className="text-sm text-muted-foreground">
                            Rigorous testing and quality control processes
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">On-Time Delivery</h4>
                          <p className="text-sm text-muted-foreground">
                            Commitment to meeting deadlines without compromising quality
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Ongoing Support</h4>
                          <p className="text-sm text-muted-foreground">
                            Continuous support and maintenance after project completion
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-accent/5">
          <Container size="lg" padding="lg">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The talented individuals behind our success and your next project
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} hover className="text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-20 h-20 bg-primary rounded-full mx-auto flex items-center justify-center text-primary-foreground font-bold text-xl">
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {member.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-background">
          <Container size="lg" padding="lg">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The principles that guide our work and define our culture
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index} className="text-center hover-lift">
                    <CardContent className="p-8 space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <Container size="lg" padding="lg">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Work Together?
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Join our growing list of satisfied clients and let's create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Start Your Project
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  Schedule a Call
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}