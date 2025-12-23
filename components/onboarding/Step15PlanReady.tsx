'use client'

import { useEffect } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'
import { motion } from 'framer-motion'

interface Step15PlanReadyProps {
  onNext: () => void
  onBack: () => void
}

export default function Step15PlanReady({ onNext }: Step15PlanReadyProps) {
  const { planPreview, profile } = useOnboardingStore()
  
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex flex-col justify-start" style={{ paddingTop: '29.76px' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-plus-jakarta text-[40px] font-bold leading-[48px] mb-8 text-center text-gray-800"
        >
          {profile.username || 'Mex'}, your personalized plan is ready!
        </motion.h2>
        
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-gray-100">
          <div className="space-y-4 mb-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">Duration</div>
              <div className="text-lg font-semibold">{planPreview.durationWeeks} weeks</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Goal</div>
              <div className="text-lg font-semibold">{planPreview.goalLabel}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Interests</div>
              <div className="text-lg font-semibold">{planPreview.interestsLabel}</div>
            </div>
          </div>
          
          {/* Simplified chart */}
          <div className="h-32 bg-primary-light rounded-xl flex items-end justify-around p-2">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="bg-primary rounded-t"
                style={{
                  width: '6%',
                  height: `${60 + (i * 3)}%`,
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Character placeholder */}
        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 bg-primary-light rounded-full flex items-center justify-center">
            <span className="text-6xl">👤</span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-center px-4">
            <div className="w-full max-w-md">
              <Button
                variant="primary"
                className="w-full py-2.5 text-base min-w-[300px]" 
                onClick={onNext}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
