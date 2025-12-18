'use client'

import { useEffect, useState } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'
import { motion } from 'framer-motion'

interface Step9BMIProps {
  onNext: () => void
  onBack: () => void
}

const categories = [
  { label: 'Underweight', range: [0, 18.5], color: '#3B82F6' },
  { label: 'Normal', range: [18.5, 25], color: '#10B981' },
  { label: 'Overweight', range: [25, 30], color: '#F59E0B' },
  { label: 'Obese', range: [30, 100], color: '#EF4444' },
]

export default function Step9BMI({ onNext }: Step9BMIProps) {
  const { metrics, setMetrics, aboutYou } = useOnboardingStore()
  const [bmiValue, setBmiValue] = useState<number>(metrics.bmi.value || 23.7)
  const [category, setCategory] = useState<string | null>(metrics.bmi.category || 'normal')
  
  useEffect(() => {
    // Mock BMI calculation (in reality, weight is needed)
    const calculatedBmi = bmiValue
    let bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese' = 'normal'
    
    if (calculatedBmi < 18.5) bmiCategory = 'underweight'
    else if (calculatedBmi < 25) bmiCategory = 'normal'
    else if (calculatedBmi < 30) bmiCategory = 'overweight'
    else bmiCategory = 'obese'
    
    setCategory(bmiCategory)
    setMetrics({
      bmi: {
        value: calculatedBmi,
        category: bmiCategory,
      },
    })
  }, [bmiValue, setMetrics])
  
  const currentCategory = categories.find(c => {
    const [min, max] = c.range
    return bmiValue >= min && bmiValue < max
  })
  
  const bgColor = category === 'underweight' ? 'bg-blue-50' :
                  category === 'overweight' ? 'bg-yellow-50' :
                  category === 'obese' ? 'bg-red-50' : 'bg-green-50'
  
  return (
    <div className={`flex flex-col h-full px-6 py-8 ${bgColor} transition-colors duration-300`}>
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          Your current BMI
        </h2>
        
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative w-48 h-48 mb-6"
          >
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-primary-light"
              />
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(bmiValue / 40) * 502.65} 502.65`}
                className="text-primary transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-800">{bmiValue.toFixed(1)}</div>
                <div className="text-sm text-gray-600">BMI</div>
              </div>
            </div>
          </motion.div>
          
          <div className="w-full max-w-sm mb-6">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              {categories.map((cat) => (
                <span key={cat.label}>{cat.label}</span>
              ))}
            </div>
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
              {categories.map((cat, index) => {
                const [min, max] = cat.range
                const width = ((max - min) / 40) * 100
                const left = (min / 40) * 100
                return (
                  <div
                    key={cat.label}
                    className="absolute h-full"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                )
              })}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 max-w-sm">
            <p className="text-sm text-gray-700 leading-relaxed">
              Your BMI of {bmiValue.toFixed(1)} falls in the {currentCategory?.label.toLowerCase()} range. 
              We&apos;ll create a personalized plan to help you reach your goals safely and effectively.
            </p>
          </div>
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
