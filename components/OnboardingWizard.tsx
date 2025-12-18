'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from './BackButton'
import ProgressBar from './ProgressBar'
import Step0Welcome from './onboarding/Step0Welcome'
import Step1Email from './onboarding/Step1Email'
import Step2OTP from './onboarding/Step2OTP'
import Step3Sex from './onboarding/Step3Sex'
import Step4Birthday from './onboarding/Step4Birthday'
import Step5MainGoal from './onboarding/Step5MainGoal'
import Step6Motivation from './onboarding/Step6Motivation'
import Step7Activities from './onboarding/Step7Activities'
import Step8Height from './onboarding/Step8Height'
import Step9BMI from './onboarding/Step9BMI'
import Step10GoalWeight from './onboarding/Step10GoalWeight'
import Step11Rate from './onboarding/Step11Rate'
import Step12RatingModal from './onboarding/Step12RatingModal'
import Step13PlanPreview from './onboarding/Step13PlanPreview'
import Step14Crafting from './onboarding/Step14Crafting'
import Step15PlanReady from './onboarding/Step15PlanReady'
import Step16Paywall from './onboarding/Step16Paywall'
import Step17Username from './onboarding/Step17Username'
import Step18Finish from './onboarding/Step18Finish'

interface OnboardingWizardProps {
  currentStep: number
  totalSteps: number
  onNext: () => void
  onBack: () => void
}

const stepComponents = [
  Step0Welcome,
  Step1Email,
  Step2OTP,
  Step3Sex,
  Step4Birthday,
  Step5MainGoal,
  Step6Motivation,
  Step7Activities,
  Step8Height,
  Step9BMI,
  Step10GoalWeight,
  Step11Rate,
  Step12RatingModal,
  Step13PlanPreview,
  Step14Crafting,
  Step15PlanReady,
  Step16Paywall,
  Step17Username,
  Step18Finish,
]

export default function OnboardingWizard({
  currentStep,
  totalSteps,
  onNext,
  onBack,
}: OnboardingWizardProps) {
  const [direction, setDirection] = useState(1)
  const prevStepRef = useRef(0)
  
  useEffect(() => {
    setDirection(currentStep > prevStepRef.current ? 1 : -1)
    prevStepRef.current = currentStep
  }, [currentStep])
  
  const StepComponent = stepComponents[currentStep]
  const showProgress = currentStep >= 3 && currentStep <= 17
  const showBackButton = currentStep > 0 && currentStep !== 12
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }
  
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white">
      {/* Header */}
      {(showBackButton || showProgress) && (
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
          <div className="px-4 py-3 flex items-center gap-3">
            {showBackButton && <BackButton onClick={onBack} />}
            {showProgress && (
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700 mb-1">About you</div>
                <ProgressBar current={currentStep - 2} total={15} />
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <StepComponent onNext={onNext} onBack={onBack} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
