'use client'

import { useState } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'
import { motion } from 'framer-motion'

interface Step3SexProps {
  onNext: () => void
  onBack: () => void
}

const options = [
  { value: 'male', label: 'Male', icon: '♂' },
  { value: 'female', label: 'Female', icon: '♀' },
  { value: 'other', label: 'Other', icon: '⚧' },
]

export default function Step3Sex({ onNext }: Step3SexProps) {
  const { aboutYou, setAboutYou } = useOnboardingStore()
  const [selected, setSelected] = useState<string | null>(aboutYou.sex)
  
  const handleSelect = (value: string) => {
    setSelected(value)
    setAboutYou({ sex: value as 'male' | 'female' | 'other' })
  }
  
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          What is your sex?
        </h2>
        
        <div className="space-y-4">
          {options.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option.value)}
              className={`
                w-full p-6 rounded-2xl border-2 text-left transition-all
                ${selected === option.value
                  ? 'border-primary bg-primary-light'
                  : 'border-gray-200 bg-white hover:border-primary/50'
                }
              `}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{option.icon}</span>
                <span className="text-lg font-medium">{option.label}</span>
              </div>
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
