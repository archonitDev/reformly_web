'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Step14CraftingProps {
  onNext: () => void
  onBack: () => void
}

const steps = [
  'Reviewing your personal details',
  'Estimating your metabolic balance',
  'Tailoring plan to your schedule',
  'Choosing the best workouts for you',
]

export default function Step14Crafting({ onNext }: Step14CraftingProps) {
  const [progress, setProgress] = useState(11)
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  
  useEffect(() => {
    if (isComplete) return
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          setIsComplete(true)
          return 100
        }
        if (prev < 11) {
          return 11
        }
        if (prev >= 11 && prev < 50) {
          return prev + 2
        }
        if (prev >= 50 && prev < 95) {
          return prev + 1
        }
        return prev
      })
    }, 200)
    
    return () => clearInterval(interval)
  }, [isComplete])
  
  useEffect(() => {
    setCurrentStep((prev) => {
      if (prev < steps.length - 1 && progress >= (prev + 1) * 25) {
        return prev + 1
      }
      return prev
    })
  }, [progress])
  
  // Auto-advance to next step when complete
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        onNext()
      }, 500) // Small delay for smooth transition
      return () => clearTimeout(timer)
    }
  }, [isComplete, onNext])
  
  // Use fixed radius for calculations, SVG will scale via viewBox
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference
  const center = 50 // viewBox center
  
  return (
    <div className="flex flex-col h-full px-4 sm:px-6 py-6 sm:py-8 pt-0">
      <div className="flex flex-col justify-start items-center" style={{ paddingTop: '29.76px' }}>
        <h2 className="font-plus-jakarta text-2xl sm:text-3xl md:text-[40px] font-bold leading-tight sm:leading-[48px] mb-6 sm:mb-8 md:mb-12 text-center text-gray-800 px-2">
          Crafting Your Plan
        </h2>
        
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-6 sm:mb-8 md:mb-12">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-primary-light"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="text-primary transition-all duration-300"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">{progress}%</div>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-sm space-y-3 sm:space-y-4 px-2 sm:px-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: index <= currentStep ? 1 : 0.5,
                x: 0,
              }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <div className={`
                w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0
                ${index <= currentStep
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-400'
                }
              `}>
                {index < currentStep ? (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current" />
                )}
              </div>
              <span className={`text-sm sm:text-base ${index <= currentStep ? 'text-gray-800' : 'text-gray-400'}`}>
                {step}
              </span>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  )
}
