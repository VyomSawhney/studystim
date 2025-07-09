'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setEmail('')
      } else {
        const error = await response.json()
        alert(error.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Signup error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  const ingredients = [
    {
      name: 'L-Theanine',
      description: 'STAY CALM; DIAL IN',
      icon: '🧘'
    },
    {
      name: 'Caffeine',
      description: 'CLEAN ENERGY; NO CRASH',
      icon: '⚡'
    },
    {
      name: 'Alpha-GPC',
      description: 'LASER MEMORY MODE',
      icon: '🎯'
    },
    {
      name: 'Rhodiola',
      description: 'CHILL OUT; LOCK IN',
      icon: '🌿'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-600">StudyStim™</div>
          <button 
            onClick={scrollToWaitlist}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-colors"
          >
            Join Waitlist
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                STUDY
                <span className="block text-orange-500">STIM™</span>
              </h1>
              <p className="text-2xl text-gray-600 font-medium">
                BRAIN BOOST DRINK
              </p>
              <p className="text-lg text-gray-500 max-w-lg">
                The ultimate cognitive enhancer designed for students, professionals, and anyone looking to unlock their mental potential.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-6 rounded-2xl flex-shrink-0">
                <div className="text-4xl">🧠</div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Scientifically Formulated</h3>
                <p className="text-gray-600">Premium nootropics for peak mental performance</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">What&apos;s Inside:</h3>
              <div className="grid grid-cols-2 gap-4">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-orange-100">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{ingredient.icon}</span>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{ingredient.name}</h4>
                        <p className="text-xs text-gray-500 uppercase">{ingredient.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-2xl opacity-30"></div>
              <Image
                src="/studystim-can.png"
                alt="StudyStim Brain Boost Drink Can"
                width={400}
                height={600}
                className="relative z-10 drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                Be the First to Experience StudyStim™
              </h2>
              <p className="text-xl text-gray-600">
                Join our exclusive waitlist and get notified when StudyStim becomes available. 
                Early subscribers get special launch pricing!
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-8 py-4 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <ChevronRightIcon className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  No spam, just updates on our launch and exclusive offers.
                </p>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <CheckCircleIcon className="h-16 w-16 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">You&apos;re on the list! 🎉</h3>
                <p className="text-gray-600">
                  Thanks for joining our waitlist. We&apos;ll notify you as soon as StudyStim is available.
                </p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">12 FL OZ</div>
                <div className="text-sm text-gray-600">Perfect Size</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">4</div>
                <div className="text-sm text-gray-600">Key Ingredients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">0</div>
                <div className="text-sm text-gray-600">Sugar Crash</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold text-orange-400">StudyStim™</div>
            <p className="text-gray-400">
              Brain Boost Drink - Unlock Your Mental Potential
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>© 2025 StudyStim</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
