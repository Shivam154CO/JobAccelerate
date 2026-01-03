"use client"

import { NavHeader } from "@/components/nav-header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FeatureSection } from "@/components/feature-section"
import { ErrorBoundary } from "@/components/error-boundary"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  CheckCircle2, 
  Zap, 
  Brain, 
  Mail, 
  BarChart3, 
  Settings, 
  Shield, 
  Smartphone,
  Sparkles,
  Users,
  CheckCircle 
} from "lucide-react"
import Link from "next/link"

// Core features data
const coreFeatures = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "AI Auto-Apply Engine",
    description: "Autonomous job applications 24/7",
    features: [
      "50-500+ daily applications",
      "Multi-job-board support",
      "Smart form filling",
      "Error recovery & retries",
    ],
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Job Matching Algorithm",
    description: "ML-powered job relevance scoring",
    features: [
      "100+ factor analysis",
      "Role & seniority matching",
      "Salary alignment",
      "Growth opportunity scoring",
    ],
  },
  {
    icon: <Mail className="w-8 h-8" />,
    title: "Recruiter Outreach",
    description: "Automated email discovery & outreach",
    features: [
      "Email finder (1000+ contacts)",
      "Personalized templates",
      "A/B testing",
      "Delivery optimization",
    ],
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Analytics Dashboard",
    description: "Real-time job search insights",
    features: [
      "Application → Interview funnel",
      "Open & reply rates",
      "CV performance metrics",
      "Trend analysis",
    ],
  },
]

// Deep dive features data
const deepDiveFeatures = [
  {
    icon: <Zap />,
    title: "Autonomous Job Search Engine",
    description: "24/7 AI agents find, filter, and apply to jobs",
    imagePosition: "right" as const,
    points: [
      "Daily schedule automation",
      "Multi-source job scraping (LinkedIn, Indeed, Wellfound, etc.)",
      "Intelligent match scoring",
      "Automatic form submission",
      "Application tracking & status monitoring",
    ],
  },
  {
    icon: <Brain />,
    title: "Resume Intelligence",
    description: "AI-powered CV analysis and optimization",
    imagePosition: "left" as const,
    points: [
      "Advanced resume parsing",
      "Skill extraction & mapping",
      "ATS optimization scoring",
      "Keyword recommendations",
      "Multi-CV A/B testing",
    ],
  },
  {
    icon: <Mail />,
    title: "Smart Recruiter Outreach",
    description: "Find and contact recruiters at scale",
    imagePosition: "right" as const,
    points: [
      "Email discovery API integration",
      "Recruiter profile enrichment",
      "Personalized message templates",
      "A/B testing for messaging",
      "Open rate & reply tracking",
    ],
  },
  {
    icon: <BarChart3 />,
    title: "Advanced Analytics",
    description: "Data-driven insights into your job search",
    imagePosition: "left" as const,
    points: [
      "Application conversion funnel",
      "Real-time performance metrics",
      "CV performance comparison",
      "Interview rate tracking",
      "Custom reporting & exports",
    ],
  },
]

// Additional features data
const additionalFeatures = [
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Custom Workflows",
    description: "Build your perfect automation",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Privacy & Security",
    description: "Enterprise-grade protection",
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile App",
    description: "Apply on the go",
  },
  {
    icon: <Mail className="w-8 h-8" />,
    title: "Bot Integration",
    description: "WhatsApp/Telegram support",
  },
]

// Enhanced features for the grid
const enhancedFeatures = [
  {
    icon: Sparkles,
    title: "AI-Powered Applications",
    description: "Our AI agents automatically find and apply to jobs matching your criteria 24/7.",
    points: ["Smart job matching", "Auto-application", "Cover letter generation"]
  },
  {
    icon: Zap,
    title: "Instant Job Matching",
    description: "Get matched with relevant jobs in seconds using our advanced algorithms.",
    points: ["Real-time matching", "Custom filters", "Priority queue"]
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is encrypted and never shared without your permission.",
    points: ["End-to-end encryption", "GDPR compliant", "Data anonymization"]
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track your application performance with detailed insights and recommendations.",
    points: ["Success rate tracking", "Interview analytics", "Improvement suggestions"]
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join our community of job seekers and get support from career coaches.",
    points: ["Expert advice", "Peer reviews", "Networking opportunities"]
  }
]

function HeroSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border/10">
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          All-in-One Job Search Platform
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Powerful Features to
          <br />
          <span className="gradient-text">Automate Your Job Search</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Everything you need to find, apply, and land your dream job — powered by cutting-edge AI
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 px-8" asChild>
            <Link href="/signup">Get Started Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/demo">Schedule Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function CoreFeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border/10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Core Capabilities</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreFeatures.map((feature, i) => (
            <Card key={i} className="p-6 glassmorphic border-border/20 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-primary">{feature.icon}</div>
                <div>
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {feature.features.map((f, j) => (
                  <li key={j} className="flex gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function DeepDiveFeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 space-y-20 border-b border-border/10">
      <div className="mx-auto max-w-7xl">
        {deepDiveFeatures.map((feature, index) => (
          <div key={index} className="mb-20 last:mb-0">
            <FeatureSection
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              imagePosition={feature.imagePosition}
              content={
                <div>
                  <ul className="space-y-3 mb-6">
                    {feature.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function EnhancedFeaturesGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {enhancedFeatures.map((feature, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feature.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AdditionalFeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border/10 bg-card/20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">More Powerful Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, i) => (
            <Card key={i} className="p-6 glassmorphic border-border/20 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-primary mb-3 flex justify-center">{feature.icon}</div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl text-center">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Accelerate Your Job Search?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of successful job seekers who found their dream jobs faster with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <NavHeader />
      
      <main className="pt-24">
        <HeroSection />
        <CoreFeaturesSection />
        <DeepDiveFeaturesSection />
        <EnhancedFeaturesGrid />
        <AdditionalFeaturesSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

export default function FeaturesPage() {
  return (
    <ErrorBoundary sectionName="Features Page">
      <FeaturesContent />
    </ErrorBoundary>
  )
}