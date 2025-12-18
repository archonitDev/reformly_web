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
  },
  {
    id: 'find-self-love',
    title: 'Find Self-Love',
    description: 'Drop extra pounds without stress',
  },
  {
    id: 'build-muscle',
    title: 'Build Muscle',
    description: 'Strengthen and define your muscles',
  },
  {
    id: 'keep-fit',
    title: 'Keep fit',
    description: 'Stay in shape, balanced & confident',
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
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          What&apos;s your main goal?
        </h2>
        
        <div className="space-y-4">
          {goals.map((goal) => (
            <motion.button
              key={goal.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(goal.id)}
              className={`
                w-full p-5 rounded-2xl border-2 text-left transition-all
                ${selected === goal.id
                  ? 'border-primary bg-primary-light'
                  : 'border-gray-200 bg-white hover:border-primary/50'
                }
              `}
            >
              <div className="font-semibold text-lg mb-1">{goal.title}</div>
              <div className="text-sm text-gray-600">{goal.description}</div>
            </motion.button>
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
