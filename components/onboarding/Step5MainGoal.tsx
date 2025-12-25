'use client'

import Image from 'next/image'
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
    icon: '/logos/lose_weight.svg',
  },
  {
    id: 'find-self-love',
    title: 'Find Self-Love',
    description: 'Drop extra pounds without stress',
    icon: '/logos/self_love_1.svg',
  },
  {
    id: 'build-muscle',
    title: 'Build Muscle',
    description: 'Strengthen and define your muscles',
    icon: '/logos/build_muscle.svg',
  },
  {
    id: 'keep-fit',
    title: 'Keep fit',
    description: 'Stay in shape, balanced & confident',
    icon: '/logos/keep_fit.svg',
  },
]

export default function Step5MainGoal({ onNext }: Step5MainGoalProps) {
  const mainGoal = useOnboardingStore(s => s.aboutYou.mainGoal)
  const setAboutYou = useOnboardingStore(s => s.setAboutYou)
  
  const handleSelect = (goalId: string) => {
    setAboutYou({ mainGoal: goalId })
  }
  
  return (
    <div className="flex flex-col h-full w-full py-6 sm:py-8 px-3 sm:px-4">
      <div className="flex flex-col justify-start items-center" style={{ paddingTop: '29.76px' }}>
      <h2 className="font-plus-jakarta text-2xl sm:text-3xl md:text-[40px] font-bold leading-tight sm:leading-[48px] mb-3 sm:mb-4 text-center text-gray-800 px-2">
          What&apos;s your main goal?
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 text-center w-full max-w-md px-2">
          This impacts key factors for your body metrics. We use this data solely to provide tailored content to you.
        </p>
        
        
        <div className="w-full space-y-2 sm:space-y-3 px-2 mb-4" style={{ maxWidth: 'calc(28rem + 10%)' }}>
          {goals.map((goal) => {
            const isSelected = mainGoal === goal.id
            
            return (
              <motion.button
                key={goal.id}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(goal.id)}
                className={`
                  w-full py-3 px-4 rounded-2xl border-2 transition-all flex items-center gap-3
                  ${isSelected
                    ? 'border-black bg-white'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                `}
              >
                <div className="flex-shrink-0">
                  <Image
                    src={goal.icon}
                    alt={goal.title}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-base mb-0.5">{goal.title}</div>
                  <div className="text-xs text-gray-600">{goal.description}</div>
                </div>
                <div className="flex-shrink-0" style={{ flexShrink: 0, width: '24px', height: '24px', position: 'relative', zIndex: 100 }}>
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
              </motion.button>
            )
          })}
        </div>
        
        <div className="mt-4 w-full px-2" style={{ maxWidth: 'calc(28rem + 10%)' }}>
          <div className="flex justify-center px-2 sm:px-4">
            <div className="w-full">
              <Button
                variant="primary"
                className="w-full py-2.5 text-sm sm:text-base md:min-w-[300px]" 
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
