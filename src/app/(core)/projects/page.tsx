'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import {
  Search,
  Filter,
  ExternalLink,
  Github,
  Calendar,
  Tag,
  TrendingUp,
  Users,
  ArrowRight,
  X
} from 'lucide-react'
import { Project } from '@/types'
import { dataStore } from '@/lib/data/store'

const categories = [
  { id: 'all', name: 'All Projects', count: 0 },
  { id: 'web-design', name: 'Web Design', count: 0 },
  { id: 'development', name: 'Development', count: 0 },
  { id: 'branding', name: 'Branding', count: 0 },
  { id: 'marketing', name: 'Marketing', count: 0 },
  { id: 'mobile', name: 'Mobile', count: 0 }
]

const sortOptions = [
  { id: 'featured', name: 'Featured First' },
  { id: 'newest', name: 'Newest First' },
  { id: 'oldest', name: 'Oldest First' },
  { id: 'name', name: 'Name (A-Z)' }
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [categoriesWithCount, setCategoriesWithCount] = useState(categories)

  // Load projects on component mount
  useEffect(() => {
    const loadProjects = () => {
      try {
        const storedProjects = dataStore.getProjects()
        setProjects(storedProjects)
        setFilteredProjects(storedProjects)

        // Update category counts
        const categoryCounts = [...categories]
        categoryCounts[0].count = storedProjects.length // All projects count

        storedProjects.forEach(project => {
          const categoryIndex = categoryCounts.findIndex(cat => cat.id === project.category)
          if (categoryIndex > 0) {
            categoryCounts[categoryIndex].count++
          }
        })

        setCategoriesWithCount(categoryCounts)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  // Filter and sort projects
  useEffect(() => {
    let result = [...projects]

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(project => project.category === selectedCategory)
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.client.toLowerCase().includes(searchLower) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
      case 'newest':
        result.sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime())
        break
      case 'oldest':
        result.sort((a, b) => new Date(a.completedDate).getTime() - new Date(b.completedDate).getTime())
        break
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    setFilteredProjects(result)
  }, [projects, selectedCategory, searchTerm, sortBy])

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'web-design': '🎨',
      'development': '💻',
      'branding': '🏷️',
      'marketing': '📈',
      'mobile': '📱'
    }
    return icons[category] || '📁'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const ProjectCard = ({ project }: { project: Project }) => (
    <Card hover className="overflow-hidden group">
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">{getCategoryIcon(project.category)}</span>
        </div>

        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
            Featured
          </div>
        )}

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/90 rounded-lg hover:bg-white transition-colors"
            >
              <ExternalLink className="h-5 w-5 text-gray-900" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/90 rounded-lg hover:bg-white transition-colors"
            >
              <Github className="h-5 w-5 text-gray-900" />
            </a>
          )}
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {categories.find(cat => cat.id === project.category)?.name}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(project.completedDate)}
          </span>
        </div>

        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">{project.client}</span>
          <div className="flex gap-2 flex-wrap">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className="px-2 py-1 bg-muted text-xs rounded">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-muted text-xs rounded">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {project.caseStudy && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4 text-muted-foreground">
                {project.caseStudy.metrics?.trafficIncrease && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>+{project.caseStudy.metrics.trafficIncrease}% traffic</span>
                  </div>
                )}
                {project.caseStudy.metrics?.conversionRate && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span>+{project.caseStudy.metrics.conversionRate}% conversion</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const SuccessStory = ({ project }: { project: Project }) => (
    <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full inline-block">
              Success Story
            </span>
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <p className="text-muted-foreground">{project.caseStudy?.challenge}</p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Challenge</h4>
              <p className="text-sm text-muted-foreground">{project.caseStudy?.challenge}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Solution</h4>
              <p className="text-sm text-muted-foreground">{project.caseStudy?.solution}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Results</h4>
              <p className="text-sm text-muted-foreground mb-4">{project.caseStudy?.results}</p>

              {project.caseStudy?.metrics && (
                <div className="grid grid-cols-3 gap-4">
                  {project.caseStudy.metrics.trafficIncrease && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">+{project.caseStudy.metrics.trafficIncrease}%</div>
                      <div className="text-xs text-muted-foreground">Traffic Increase</div>
                    </div>
                  )}
                  {project.caseStudy.metrics.conversionRate && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">+{project.caseStudy.metrics.conversionRate}%</div>
                      <div className="text-xs text-muted-foreground">Conversion Rate</div>
                    </div>
                  )}
                  {project.caseStudy.metrics.roi && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{project.caseStudy.metrics.roi}%</div>
                      <div className="text-xs text-muted-foreground">ROI</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-primary rounded-xl mx-auto flex items-center justify-center">
              <span className="text-4xl">📊</span>
            </div>
            <p className="text-foreground font-semibold">{project.client}</p>
          </div>
        </div>
      </div>
    </Card>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation variant="core" />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary rounded-full mx-auto animate-pulse" />
            <p>Loading projects...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const successStories = filteredProjects.filter(project => project.caseStudy && project.featured)

  return (
    <div className="min-h-screen bg-background">
      <Navigation variant="core" />

      <main>
        {/* Header Section */}
        <section className="py-20 bg-gradient-to-br from-background via-background to-accent/20">
          <Container size="xl" padding="lg">
            <div className="text-center space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient">
                Our Portfolio
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Explore our collection of successful projects and see how we've helped businesses transform their digital presence with innovative solutions.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search projects by name, client, or technology..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    leftIcon={<Search className="h-5 w-5" />}
                    className="pl-12"
                  />
                </div>
              </div>

              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant={showFilters ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {selectedCategory !== 'all' && (
                      <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                        1
                      </span>
                    )}
                  </Button>
                </div>

                {selectedCategory !== 'all' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Category
                  </Button>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Filters Section */}
        {showFilters && (
          <section className="py-8 border-b bg-accent/5">
            <Container size="xl" padding="lg">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Category Filters */}
                <div>
                  <h3 className="font-semibold mb-4">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categoriesWithCount.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className="flex items-center gap-2"
                      >
                        {category.name}
                        <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                          {category.count}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h3 className="font-semibold mb-4">Sort By</h3>
                  <div className="flex flex-wrap gap-2">
                    {sortOptions.map((option) => (
                      <Button
                        key={option.id}
                        variant={sortBy === option.id ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setSortBy(option.id)}
                      >
                        {option.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* Success Stories */}
        {successStories.length > 0 && (
          <section className="py-20 bg-background">
            <Container size="xl" padding="lg">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Success Stories</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Highlighted case studies showcasing measurable results and client success
                </p>
              </div>

              <div className="space-y-12">
                {successStories.slice(0, 2).map((project) => (
                  <SuccessStory key={project.id} project={project} />
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Projects Grid */}
        <section className="py-20 bg-accent/5">
          <Container size="xl" padding="lg">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                All Projects ({filteredProjects.length})
              </h2>
              {searchTerm && (
                <p className="text-lg text-muted-foreground">
                  Showing results for "{searchTerm}"
                </p>
              )}
            </div>

            {filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto flex items-center justify-center mb-6">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSortBy('featured')
                }}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <Container size="lg" padding="lg">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Join our list of satisfied clients and let's create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Start Your Project
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  Schedule Consultation
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