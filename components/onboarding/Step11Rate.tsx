'use client'

import { useState } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'
import { motion } from 'framer-motion'

interface Step11RateProps {
  onNext: () => void
  onBack: () => void
}

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'Reformly changed my life! I reached my goal in just 3 months.',
    avatar: '👩',
  },
  {
    name: 'John D.',
    text: 'The personalized plan was exactly what I needed. Highly recommend!',
    avatar: '👨',
  },
  {
    name: 'Emma L.',
    text: 'Best fitness app I\'ve ever used. The results speak for themselves.',
    avatar: '👩',
  },
]

export default function Step11Rate({ onNext }: Step11RateProps) {
  const { rating, setRating } = useOnboardingStore()
  const [selectedStars, setSelectedStars] = useState<number>(rating.stars || 0)
  
  const handleStarClick = (stars: number) => {
    setSelectedStars(stars)
    setRating({ stars })
    if (stars >= 4) {
      // Show rating modal (next step)
      setTimeout(() => {
        onNext()
      }, 500)
    }
  }
  
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          Show your love
        </h2>
        
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleStarClick(star)}
              className="text-5xl focus:outline-none"
            >
              {star <= selectedStars ? '⭐' : '☆'}
            </motion.button>
          ))}
        </div>
        
        <p className="text-sm text-gray-600 text-center mb-8">
          Reformly users who reached their goals
        </p>
        
        <div className="space-y-4 mb-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-4 border-2 border-gray-100"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div className="flex-1">
                  <div className="font-semibold mb-1">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.text}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="sticky bottom-0 pb-6 pt-4 bg-white border-t border-gray-100">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
