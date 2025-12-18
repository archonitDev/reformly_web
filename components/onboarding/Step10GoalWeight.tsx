'use client'

import { useState, useEffect } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'
import { motion } from 'framer-motion'

interface Step10GoalWeightProps {
  onNext: () => void
  onBack: () => void
}

export default function Step10GoalWeight({ onNext }: Step10GoalWeightProps) {
  const { metrics, setMetrics } = useOnboardingStore()
  const [value, setValue] = useState<number>(metrics.goalWeight.value || 59)
  const [unit, setUnit] = useState<'kg' | 'lb'>(metrics.goalWeight.unit || 'kg')
  
  useEffect(() => {
    setMetrics({
      goalWeight: { value, unit },
    })
  }, [value, unit, setMetrics])
  
  const minValue = unit === 'kg' ? 30 : 66
  const maxValue = unit === 'kg' ? 200 : 440
  const step = unit === 'kg' ? 1 : 1
  
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          What&apos;s your goal weight?
        </h2>
        
        <div className="flex flex-col items-center mb-8">
          <div className="text-6xl font-bold text-primary mb-4">
            {value}
            <span className="text-3xl ml-2 text-gray-600">{unit}</span>
          </div>
          
          <div className="w-full max-w-xs mb-6">
            <input
              type="range"
              min={minValue}
              max={maxValue}
              step={step}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full h-2 bg-primary-light rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (unit === 'lb') {
                  setValue(Math.round(value * 0.453592))
                }
                setUnit('kg')
              }}
              className={`
                px-6 py-2 rounded-full font-medium transition-all
                ${unit === 'kg'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              KG
            </button>
            <button
              onClick={() => {
                if (unit === 'kg') {
                  setValue(Math.round(value / 0.453592))
                }
                setUnit('lb')
              }}
              className={`
                px-6 py-2 rounded-full font-medium transition-all
                ${unit === 'lb'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              LB
            </button>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-light rounded-2xl p-4"
        >
          <p className="text-sm text-gray-700">
            Easy win: We&apos;ll help you reach your goal weight step by step with a personalized plan.
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
