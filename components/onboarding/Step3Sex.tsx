'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'
import { motion } from 'framer-motion'

interface Step3SexProps {
  onNext: () => void
  onBack: () => void
}

const options = [
  { value: 'male', label: 'Male', icon: '/logos/male.svg' },
  { value: 'female', label: 'Female', icon: '/logos/female.svg' },
  { value: 'other', label: 'Other', icon: '/logos/other_gender.svg' },
]

export default function Step3Sex({ onNext }: Step3SexProps) {
  const sex = useOnboardingStore(s => s.aboutYou.sex)
  const setAboutYou = useOnboardingStore(s => s.setAboutYou)
  
  // Debug: track sex changes
  useEffect(() => {
    console.log('render sex', sex)
  }, [sex])
  
  const handleSelect = (value: string) => {
    console.log('clicked', value)
    setAboutYou({ sex: value as 'male' | 'female' | 'other' })
    // Debug: check value after update
    const storeSex = useOnboardingStore.getState().aboutYou.sex
    console.log('store sex after', storeSex)
  }
  
  return (
    <div className="flex flex-col h-full px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col justify-start flex-1" style={{ paddingTop: '29.76px' }}>
        <h2 className="font-plus-jakarta text-2xl sm:text-3xl md:text-[40px] font-bold leading-tight sm:leading-[48px] mb-3 sm:mb-4 text-center text-gray-800 px-2">
          What is your sex?
        </h2>
        
        <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 text-center px-2 sm:px-4">
          This impacts key factors for your body metrics. We use this data solely to provide tailored content to you.
        </p>
        
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 px-2">
          {options.map((option) => {
            const isSelected = sex === option.value
            // Debug: check condition for each option
            if (isSelected) {
              console.log(`Option ${option.value} is selected, sex=${sex}`)
            }
            
            return (
              <motion.button
                key={option.value}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(option.value)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-black bg-white'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      <Image
                        src={option.icon}
                        alt={option.label}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-lg font-medium">{option.label}</span>
                  </div>
                  <div 
                    className="flex-shrink-0" 
                    style={{ 
                      flexShrink: 0, 
                      width: '24px', 
                      height: '24px',
                      position: 'relative',
                      zIndex: 100
                    }}
                  >
                    {isSelected ? (
                      <div 
                        style={{ 
                          width: '24px', 
                          height: '24px',
                          borderRadius: '50%',
                          border: '2px solid #000000',
                          backgroundColor: '#000000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          boxSizing: 'border-box',
                          zIndex: 100,
                          opacity: 1,
                          visibility: 'visible'
                        }}
                        aria-label="Selected"
                      >
                        <svg 
                          width="14" 
                          height="14" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ 
                            display: 'block',
                            opacity: 1,
                            visibility: 'visible'
                          }}
                        >
                          <path 
                            d="M5 13l4 4L19 7" 
                            stroke="#ffffff" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div 
                        style={{ 
                          width: '24px', 
                          height: '24px',
                          borderRadius: '50%',
                          border: '2px solid #d1d5db',
                          backgroundColor: 'transparent',
                          boxSizing: 'border-box'
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
        
        <div className="mt-auto pb-4">
          <div className="flex justify-center px-2 sm:px-4">
            <div className="w-full max-w-md">
              <Button
                variant="primary"
                className="w-full py-2.5 text-sm sm:text-base md:min-w-[300px]" 
                onClick={onNext}
                disabled={!sex}
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
