'use client'

import { useState } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'
import { motion } from 'framer-motion'

interface Step5MainGoalProps {
  onNext: () => void
  onBack: () => void
}

const goals = [
  {
    id: 'lose-weight',
    title: 'Lose Weight',
    description: 'Drop extra pounds without stress',
    icon: '🔥',
  },
  {
    id: 'find-self-love',
    title: 'Find Self-Love',
    description: 'Drop extra pounds without stress',
    icon: '❤️',
  },
  {
    id: 'build-muscle',
    title: 'Build Muscle',
    description: 'Strengthen and define your muscles',
    icon: '💪',
  },
  {
    id: 'keep-fit',
    title: 'Keep fit',
    description: 'Stay in shape, balanced & confident',
    icon: '📦',
  },
]

export default function Step5MainGoal({ onNext }: Step5MainGoalProps) {
  const { aboutYou, setAboutYou } = useOnboardingStore()
  const [selected, setSelected] = useState<string | null>(aboutYou.mainGoal)
  
  const handleSelect = (goalId: string) => {
    setSelected(goalId)
    setAboutYou({ mainGoal: goalId })
  }
  
  return (
    <div className="flex flex-col h-full w-full py-8 px-4">
      <div className="flex-1 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 px-2">
          What&apos;s your main goal?
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center w-full max-w-md px-2">
          This impacts key factors for your body metrics. We use this data solely to provide tailored content to you.
        </p>
        
        
        <div className="w-full space-y-3 max-w-md px-2">
          {goals.map((goal) => (
            <motion.button
              key={goal.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(goal.id)}
              className={`
                w-full py-3 px-4 rounded-2xl border-2 transition-all flex items-center gap-3
                ${selected === goal.id
                  ? 'border-primary bg-primary-light'
                  : 'border-gray-200 bg-white hover:border-primary/50'
                }
              `}
            >
              <div className="text-xl flex-shrink-0">{goal.icon}</div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-base mb-0.5">{goal.title}</div>
                <div className="text-xs text-gray-600">{goal.description}</div>
              </div>
              <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${selected === goal.id
                  ? 'border-gray-800 bg-white'
                  : 'border-gray-300'
                }">
                {selected === goal.id && (
                  <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="sticky bottom-0 pb-2 pt-4 bg-white border-t border-gray-100">
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
  )
}
