import Link from 'next/link'
import {
  ArrowRight,
  Brain,
  Clock,
  Search,
  Shield,
  Target,
  Users
} from 'lucide-react'

import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Matching',
    description:
      'Smart candidate matching using advanced AI algorithms to find the perfect fit for your roles.'
  },
  {
    icon: Clock,
    title: 'Time-Efficient',
    description:
      'Streamline your recruitment process and reduce time-to-hire significantly.'
  },
  {
    icon: Target,
    title: 'Precision Hiring',
    description:
      'Make data-driven decisions with detailed candidate assessments and analytics.'
  },
  {
    icon: Users,
    title: 'Collaborative Hiring',
    description:
      'Enable team collaboration with shared candidate profiles and feedback systems.'
  },
  {
    icon: Shield,
    title: 'Bias-Free Recruitment',
    description:
      'Ensure fair hiring practices with AI-driven objective candidate evaluation.'
  },
  {
    icon: Search,
    title: 'Smart Screening',
    description:
      'Automated initial screening to focus on the most promising candidates.'
  }
]

const MarketingPage = () => {
  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <section className='container pb-24 pt-32'>
        <div className='mx-auto max-w-4xl text-center'>
          <h1 className='mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Transform Your Hiring with
            <span className='bg-gradient-to-r from-primary to-blue-600 bg-clip-text px-3 text-transparent'>
              AI-Powered
            </span>
            Recruitment
          </h1>
          <p className='mb-10 text-xl text-gray-600'>
            Streamline your recruitment process with intelligent candidate
            matching, automated screening, and data-driven insights.
          </p>
          <div className='flex justify-center gap-4'>
            <Link href='/customer/interviews'>
              <Button size='lg' className='gap-2'>
                Get Started <ArrowRight className='h-4 w-4' />
              </Button>
            </Link>
            <Button size='lg' variant='outline'>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className='container py-24'>
        <h2 className='mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl'>
          Powerful Features for Modern Recruitment
        </h2>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='rounded-xl border bg-white p-8 shadow-sm transition-all hover:shadow-md'
            >
              <feature.icon className='mb-4 h-12 w-12 text-primary' />
              <h3 className='mb-3 text-xl font-semibold'>{feature.title}</h3>
              <p className='text-gray-600'>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className='container py-24'>
        <div className='rounded-2xl bg-primary/5 px-8 py-16 text-center sm:px-16'>
          <h2 className='mb-4 text-3xl font-bold text-gray-900 sm:text-4xl'>
            Ready to Revolutionize Your Hiring Process?
          </h2>
          <p className='mb-8 text-xl text-gray-600'>
            Join thousands of companies using RecruitMind to build better teams.
          </p>
          <Link href='/customer/interviews'>
            <Button size='lg' className='gap-2'>
              Start Free Trial <ArrowRight className='h-4 w-4' />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default MarketingPage
