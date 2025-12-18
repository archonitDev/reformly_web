'use client'

import Button from '../Button'
import { motion } from 'framer-motion'

interface Step6MotivationProps {
  onNext: () => void
  onBack: () => void
}

export default function Step6Motivation({ onNext }: Step6MotivationProps) {
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-gray-800"
        >
          We&apos;ve helped thousands do it, you&apos;re next.
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-primary-light rounded-3xl p-6 max-w-sm"
        >
          <p className="text-gray-700 leading-relaxed">
            Join thousands of people who have transformed their lives with personalized wellness plans tailored just for them.
          </p>
        </motion.div>
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
