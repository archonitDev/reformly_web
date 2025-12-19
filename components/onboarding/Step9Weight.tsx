'use client'

import { useState, useEffect } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'

interface Step9WeightProps {
  onNext: () => void
  onBack: () => void
}

export default function Step9Weight({ onNext }: Step9WeightProps) {
  const { metrics, setMetrics } = useOnboardingStore()
  const [value, setValue] = useState<string>(String(metrics.currentWeight?.value || 65))
  const [unit, setUnit] = useState<'kg' | 'lbs'>(metrics.currentWeight?.unit === 'lb' ? 'lbs' : (metrics.currentWeight?.unit === 'kg' ? 'kg' : 'kg'))
  
  useEffect(() => {
    const numValue = parseFloat(value) || 0
    if (numValue > 0) {
      setMetrics({
        currentWeight: { 
          value: numValue, 
          unit: unit === 'lbs' ? 'lb' : 'kg' 
        },
      })
    }
  }, [value, unit, setMetrics])
  
  const handleUnitChange = (newUnit: 'kg' | 'lbs') => {
    if (newUnit === unit) return
    
    const numValue = parseFloat(value) || 0
    if (numValue > 0) {
      if (unit === 'kg' && newUnit === 'lbs') {
        // Convert kg to lbs
        setValue(String(Math.round(numValue * 2.20462)))
      } else if (unit === 'lbs' && newUnit === 'kg') {
        // Convert lbs to kg
        setValue(String(Math.round(numValue * 0.453592)))
      }
    }
    setUnit(newUnit)
  }
  
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    // Allow only numbers and one decimal point
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      setValue(inputValue)
    }
  }
  
  const handleBlur = () => {
    const numValue = parseFloat(value)
    if (isNaN(numValue) || numValue <= 0) {
      setValue(unit === 'kg' ? '65' : '143')
    } else {
      setValue(String(numValue))
    }
  }
  
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          What&apos;s your weight?
        </h2>
        
        <div className="flex flex-col items-center mb-8">
          {/* Input field container */}
          <div className="w-full max-w-md bg-white rounded-2xl border-2 border-gray-200 p-6">
            {/* Unit selector */}
            <div className="flex justify-center gap-2 mb-6">
              <button
                onClick={() => handleUnitChange('kg')}
                className={`
                  px-4 py-1.5 rounded-lg text-sm font-medium transition-all
                  ${unit === 'kg'
                    ? 'bg-primary-light text-primary'
                    : 'bg-white text-gray-600'
                  }
                `}
              >
                kg
              </button>
              <button
                onClick={() => handleUnitChange('lbs')}
                className={`
                  px-4 py-1.5 rounded-lg text-sm font-medium transition-all
                  ${unit === 'lbs'
                    ? 'bg-primary-light text-primary'
                    : 'bg-white text-gray-600'
                  }
                `}
              >
                lbs
              </button>
            </div>
            
            {/* Value display and input */}
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                inputMode="decimal"
                value={value}
                onChange={handleValueChange}
                onBlur={handleBlur}
                className="text-6xl font-bold text-gray-800 text-center w-32 border-b-2 border-gray-300 focus:border-primary focus:outline-none pb-2"
                placeholder={unit === 'kg' ? '65' : '143'}
              />
              <span className="text-3xl font-semibold text-gray-800">{unit}</span>
            </div>
          </div>
        </div>
        
        {/* Information message */}
        <div className="bg-primary-light rounded-2xl p-4 max-w-md mx-auto">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary mb-1">
                Creating your personal plan
              </p>
              <p className="text-sm text-gray-700">
                People tend to have a higher body-fat percentage as they age, even at identical BMIs.
              </p>
            </div>
          </div>
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

