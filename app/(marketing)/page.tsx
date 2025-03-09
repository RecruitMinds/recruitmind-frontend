'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Brain,
  Code,
  Video,
  Bot,
  CheckCircle,
  Award,
  Clock,
  Shield
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { InView } from '@/components/core/in-view'
import { TextEffect } from '@/components/core/text-effect'

const features = [
  {
    icon: Bot,
    title: 'AI-Based Interviewer Bot',
    description:
      'Conduct realistic interview sessions with our advanced AI bot that adapts questions based on candidate responses.'
  },
  {
    icon: Code,
    title: 'Coding Knowledge Evaluation',
    description:
      'Accurately assess programming skills with hands-on coding challenges and real-time analysis of solution quality.'
  },
  {
    icon: Video,
    title: 'Interview Proctoring',
    description:
      'Ensure interview integrity with AI-powered proctoring that monitors and analyzes candidate behavior during sessions.'
  },
  {
    icon: Brain,
    title: 'Adaptive Questioning',
    description:
      'Our AI adjusts difficulty and focus based on candidate responses, ensuring the right skills are thoroughly evaluated.'
  },
  {
    icon: Shield,
    title: 'Objective Assessment',
    description:
      'Eliminate unconscious bias with standardized evaluations that focus purely on skills and competencies.'
  },
  {
    icon: Clock,
    title: 'Time-Efficient Screening',
    description:
      'Screen more candidates in less time with automated initial interviews that identify top talent quickly.'
  }
]

const benefits = [
  {
    title: 'Save 70% interviewing time',
    description: 'Automate initial screens and technical assessments'
  },
  {
    title: 'Improve candidate experience',
    description: 'Flexible scheduling and immediate feedback'
  },
  {
    title: 'Reduce hiring bias',
    description: 'Standardized assessment criteria for all candidates'
  },
  {
    title: 'Identify top talent faster',
    description: 'AI-powered insights reveal the best matches for your team'
  }
]

const MarketingPage = () => {
  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <section className='relative flex min-h-screen items-center justify-center overflow-hidden'>
        <div className='container z-10 px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <InView
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6 }}
              viewOptions={{ once: true }}
            >
              <span className='mb-6 inline-block rounded-full bg-primary/10 px-5 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-300 hover:bg-primary/15'>
                Next-Gen Technical Interview Platform
              </span>
            </InView>
            <InView
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewOptions={{ once: true }}
            >
              <h1 className='mb-8 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl'>
                <TextEffect
                  preset='fade-in-blur'
                  per='word'
                  className='inline'
                  speedReveal={0.7}
                  as='span'
                >
                  Transform Your Technical Interviews with
                </TextEffect>
                <span className='relative mx-2 inline-block bg-gradient-to-r from-primary to-blue-600 bg-clip-text px-3 text-transparent after:absolute after:bottom-0 after:left-0 after:h-[6px] after:w-full after:rounded-full after:bg-gradient-to-r after:from-primary/30 after:to-blue-600/30 after:content-[""]'>
                  <span className='font-bold'>AI-Powered</span>
                </span>
                <TextEffect
                  preset='fade-in-blur'
                  per='word'
                  className='inline'
                  speedReveal={0.7}
                  delay={0.8}
                  as='span'
                >
                  Intelligence
                </TextEffect>
              </h1>
            </InView>
            <InView
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewOptions={{ once: true }}
            >
              <p className='mb-12 text-xl text-gray-600 sm:text-2xl'>
                <TextEffect
                  per='word'
                  preset='fade'
                  speedReveal={1.1}
                  speedSegment={0.3}
                  as='span'
                >
                  Conduct smarter technical interviews, evaluate coding skills
                  objectively, and streamline your entire hiring process with
                  our advanced AI interview platform.
                </TextEffect>
              </p>
            </InView>
            <InView
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewOptions={{ once: true }}
            >
              <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
                <Link href='/customer/interviews'>
                  <Button
                    variant='default'
                    size='rounded'
                    className='gap-2 px-8 py-6 text-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg'
                  >
                    Try It Free <ArrowRight className='h-5 w-5 animate-pulse' />
                  </Button>
                </Link>
                <Link href='#how-it-works'>
                  <Button
                    size='rounded'
                    variant='secondary'
                    className='px-8 py-6 text-lg transition-all duration-300 hover:bg-gray-100'
                  >
                    See How It Works
                  </Button>
                </Link>
              </div>
            </InView>
          </div>
        </div>

        <div className='absolute inset-0 z-0 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]' />
        <div className='absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]' />
        <div className='absolute bottom-8 left-0 right-0 flex justify-center'>
          <div className='animate-bounce rounded-full bg-white p-2 shadow-md'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-primary'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 14l-7 7m0 0l-7-7m7 7V3'
              />
            </svg>
          </div>
        </div>
      </section>

      {/* How it works section with illustration */}
      <section
        id='how-it-works'
        className='container scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8'
      >
        <div>
          <div className='mx-auto max-w-3xl text-center'>
            <InView
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6 }}
              viewOptions={{ once: true }}
            >
              <span className='mb-6 inline-block rounded-full bg-primary/10 px-5 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-300 hover:bg-primary/15'>
                Simple Process
              </span>
            </InView>
            <InView
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewOptions={{ once: true }}
            >
              <h2 className='mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl'>
                <TextEffect
                  preset='slide'
                  per='word'
                  speedReveal={0.6}
                  as='span'
                >
                  How Our AI Interview Platform Works
                </TextEffect>
              </h2>
            </InView>
            <InView
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewOptions={{ once: true }}
            >
              <p className='mb-16 text-xl text-gray-600'>
                A seamless experience for both recruiters and candidates
              </p>
            </InView>
          </div>
          <div className='grid gap-12 md:grid-cols-2'>
            <div className='flex flex-col justify-center space-y-8'>
              <InView
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewOptions={{ once: true }}
              >
                <div className='group flex items-start gap-5 transition-all duration-300 hover:translate-x-1'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5 transition-all duration-300 group-hover:bg-primary group-hover:text-white'>
                    1
                  </div>
                  <div>
                    <h3 className='mb-3 text-xl font-semibold'>
                      Set Up Interview Parameters
                    </h3>
                    <p className='text-gray-600'>
                      Choose skills to assess, difficulty level, and interview
                      duration
                    </p>
                  </div>
                </div>
              </InView>
              <InView
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewOptions={{ once: true }}
              >
                <div className='group flex items-start gap-5 transition-all duration-300 hover:translate-x-1'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5 transition-all duration-300 group-hover:bg-primary group-hover:text-white'>
                    2
                  </div>
                  <div>
                    <h3 className='mb-3 text-xl font-semibold'>
                      Candidate Takes Interview
                    </h3>
                    <p className='text-gray-600'>
                      AI bot conducts interview, adapting questions based on
                      responses
                    </p>
                  </div>
                </div>
              </InView>
              <InView
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewOptions={{ once: true }}
              >
                <div className='group flex items-start gap-5 transition-all duration-300 hover:translate-x-1'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5 transition-all duration-300 group-hover:bg-primary group-hover:text-white'>
                    3
                  </div>
                  <div>
                    <h3 className='mb-3 text-xl font-semibold'>
                      Real-time Coding Assessment
                    </h3>
                    <p className='text-gray-600'>
                      Evaluate practical skills with coding challenges and live
                      analysis
                    </p>
                  </div>
                </div>
              </InView>
              <InView
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewOptions={{ once: true }}
              >
                <div className='group flex items-start gap-5 transition-all duration-300 hover:translate-x-1'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5 transition-all duration-300 group-hover:bg-primary group-hover:text-white'>
                    4
                  </div>
                  <div>
                    <h3 className='mb-3 text-xl font-semibold'>
                      Comprehensive Reports
                    </h3>
                    <p className='text-gray-600'>
                      Receive detailed insights on candidate performance and
                      skill proficiency
                    </p>
                  </div>
                </div>
              </InView>
            </div>
            {/* Enhanced placeholder for an illustration/screenshot */}
            <InView
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewOptions={{ once: true }}
            >
              <div className='relative rounded-xl bg-gray-50 p-6 shadow-lg transition-all duration-500 hover:shadow-xl'>
                <div className='relative aspect-video overflow-hidden rounded-lg bg-white shadow-md'>
                  <Image
                    src='/images/interview_ui.jpg'
                    alt='Interview UI'
                    fill
                    className='object-fill'
                  />
                  <Image
                    src='/images/assessment_ui.png'
                    alt='Interview UI'
                    fill
                    className='object-fill'
                  />
                </div>
              </div>
            </InView>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id='features'
        className='container scroll-mt-20 px-4 py-28 sm:px-6 lg:px-8'
      >
        <div className='mx-auto max-w-4xl text-center'>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
            viewOptions={{ once: true }}
          >
            <span className='mb-6 inline-block rounded-full bg-primary/10 px-5 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-300 hover:bg-primary/15'>
              Key Features
            </span>
          </InView>
          <InView
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewOptions={{ once: true }}
          >
            <h2 className='mb-6 text-center text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl'>
              <TextEffect preset='blur' per='word' speedReveal={0.6} as='span'>
                Powerful Features for Technical Interviewing
              </TextEffect>
            </h2>
          </InView>
          <InView
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewOptions={{ once: true }}
          >
            <p className='mx-auto mb-20 max-w-3xl text-center text-xl text-gray-600'>
              Our platform combines AI intelligence with industry best practices
              to deliver the most effective technical interview experience.
            </p>
          </InView>
        </div>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => (
            <InView
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewOptions={{ once: true }}
            >
              <div className='group rounded-xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'>
                <div className='mb-6 inline-flex rounded-xl bg-primary/10 p-4 transition-all duration-300 group-hover:bg-primary/20'>
                  <feature.icon className='h-8 w-8 text-primary' />
                </div>
                <h3 className='mb-4 text-xl font-semibold group-hover:text-primary'>
                  {feature.title}
                </h3>
                <p className='text-gray-600'>{feature.description}</p>
              </div>
            </InView>
          ))}
        </div>
      </section>

      {/* Benefits section */}
      <section className='bg-gray-50 py-28'>
        <div className='container px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl text-center'>
            <InView
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6 }}
              viewOptions={{ once: true }}
            >
              <span className='mb-6 inline-block rounded-full bg-primary/10 px-5 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-300 hover:bg-primary/15'>
                Key Benefits
              </span>
            </InView>
            <InView
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewOptions={{ once: true }}
            >
              <h2 className='mb-16 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl'>
                <TextEffect
                  preset='blur'
                  per='word'
                  speedReveal={0.6}
                  as='span'
                >
                  The Benefits of AI-Powered Interviews
                </TextEffect>
              </h2>
            </InView>
          </div>

          <div className='grid gap-8 sm:grid-cols-2'>
            {benefits.map((benefit, index) => (
              <InView
                key={index}
                variants={{
                  hidden: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewOptions={{ once: true }}
              >
                <div className='group flex gap-5 rounded-xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
                  <CheckCircle className='h-7 w-7 shrink-0 text-primary transition-all duration-300 group-hover:scale-110' />
                  <div>
                    <h3 className='mb-3 text-xl font-semibold'>
                      {benefit.title}
                    </h3>
                    <p className='text-gray-600'>{benefit.description}</p>
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial section */}
      <section
        id='testimonials'
        className='container scroll-mt-20 px-4 py-28 sm:px-6 lg:px-8'
      >
        <div className='relative overflow-hidden rounded-2xl bg-primary/5 px-8 py-16 shadow-lg sm:px-16'>
          <div className='mx-auto max-w-3xl text-center'>
            <InView
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.6 }}
              viewOptions={{ once: true }}
            >
              <div className='mb-8 flex justify-center'>
                <div className='rounded-full bg-white p-3 shadow-md'>
                  <Award className='h-12 w-12 text-primary' />
                </div>
              </div>
            </InView>
            <InView
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewOptions={{ once: true }}
            >
              <p className='mb-8 text-xl font-medium italic text-gray-700 md:text-2xl'>
                <TextEffect
                  preset='fade'
                  per='word'
                  speedReveal={0.7}
                  as='span'
                >
                  &ldquo;This platform has revolutionized our technical hiring
                  process. We&rsquo;ve reduced our interview time by 65% while
                  improving the quality of hires. The AI interviewer asks
                  questions we wouldn&rsquo;t have thought to ask.&rdquo;
                </TextEffect>
              </p>
            </InView>
            <InView
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewOptions={{ once: true }}
            >
              <div className='relative'>
                <div className='absolute left-1/2 top-0 h-px w-16 -translate-x-1/2 -translate-y-4 bg-gray-300'></div>
                <p className='font-semibold'>Sarah Johnson</p>
                <p className='text-sm text-gray-600'>CTO at TechInnovate</p>
              </div>
            </InView>
          </div>
          <div className='absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-3xl'></div>
          <div className='absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl'></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='container px-4 py-28 sm:px-6 lg:px-8'>
        <div className='rounded-2xl bg-gradient-to-r from-primary/90 to-blue-600/90 px-8 py-16 text-center shadow-xl sm:px-16'>
          <InView
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8 }}
            viewOptions={{ once: true }}
          >
            <h2 className='mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl'>
              Ready to Transform Your Technical Interviews?
            </h2>
          </InView>
          <InView
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewOptions={{ once: true }}
          >
            <p className='mx-auto mb-10 max-w-2xl text-xl text-white/90'>
              Join innovative teams using our platform to find the best
              technical talent.
            </p>
          </InView>
          <InView
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 }
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewOptions={{ once: true }}
          >
            <Link href='/customer/interviews'>
              <Button
                size='lg'
                variant='secondary'
                className='gap-2 px-8 py-6 text-lg font-medium shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg'
              >
                Get Started Today{' '}
                <ArrowRight className='h-5 w-5 animate-pulse' />
              </Button>
            </Link>
          </InView>
        </div>
      </section>
    </div>
  )
}

export default MarketingPage
