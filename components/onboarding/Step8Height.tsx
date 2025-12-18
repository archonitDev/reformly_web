'use client'

import { useState, useEffect } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'
import { motion } from 'framer-motion'

interface Step8HeightProps {
  onNext: () => void
  onBack: () => void
}

export default function Step8Height({ onNext }: Step8HeightProps) {
  const { metrics, setMetrics } = useOnboardingStore()
  const [value, setValue] = useState<number>(metrics.height.value || 166)
  const [unit, setUnit] = useState<'cm' | 'in'>(metrics.height.unit || 'cm')
  
  useEffect(() => {
    setMetrics({
      height: { value, unit },
    })
  }, [value, unit, setMetrics])
  
  const minValue = unit === 'cm' ? 100 : 40
  const maxValue = unit === 'cm' ? 250 : 100
  const step = unit === 'cm' ? 1 : 0.5
  
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          What&apos;s your height?
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
                if (unit === 'in') {
                  setValue(Math.round(value * 2.54))
                }
                setUnit('cm')
              }}
              className={`
                px-6 py-2 rounded-full font-medium transition-all
                ${unit === 'cm'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              CM
            </button>
            <button
              onClick={() => {
                if (unit === 'cm') {
                  setValue(Math.round(value / 2.54))
                }
                setUnit('in')
              }}
              className={`
                px-6 py-2 rounded-full font-medium transition-all
                ${unit === 'in'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              IN
            </button>
          </div>
        </div>
        
        <div className="bg-primary-light rounded-2xl p-4">
          <p className="text-sm text-gray-700">
            Creating your personal plan based on your preferences...
          </p>
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
