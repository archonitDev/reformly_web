'use client'

import { useState } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'
import { motion } from 'framer-motion'

interface Step7ActivitiesProps {
  onNext: () => void
  onBack: () => void
}

const activities = [
  'Pilates',
  'General Fitness',
  'Yoga',
  'Walking',
  'Stretching',
]

export default function Step7Activities({ onNext }: Step7ActivitiesProps) {
  const { aboutYou, setAboutYou } = useOnboardingStore()
  const [selected, setSelected] = useState<string[]>(aboutYou.activities || [])
  
  const handleToggle = (activity: string) => {
    let newSelected: string[]
    if (selected.includes(activity)) {
      newSelected = selected.filter(a => a !== activity)
    } else if (selected.length < 3) {
      newSelected = [...selected, activity]
    } else {
      return
    }
    setSelected(newSelected)
    setAboutYou({ activities: newSelected })
  }
  
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">
          Choose up to 3 activities you&apos;re interested in
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          {selected.length}/3 selected
        </p>
        
        <div className="space-y-3">
          {activities.map((activity) => {
            const isSelected = selected.includes(activity)
            const isDisabled = !isSelected && selected.length >= 3
            
            return (
              <motion.button
                key={activity}
                whileHover={!isDisabled ? { scale: 1.02 } : {}}
                whileTap={!isDisabled ? { scale: 0.98 } : {}}
                onClick={() => handleToggle(activity)}
                disabled={isDisabled}
                className={`
                  w-full p-4 rounded-xl border-2 text-left transition-all
                  ${isSelected
                    ? 'border-primary bg-primary-light'
                    : isDisabled
                    ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                    : 'border-gray-200 bg-white hover:border-primary/50'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{activity}</span>
                  <div className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center
                    ${isSelected
                      ? 'border-primary bg-primary'
                      : 'border-gray-300'
                    }
                  `}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </motion.button>
            )
          })}
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
