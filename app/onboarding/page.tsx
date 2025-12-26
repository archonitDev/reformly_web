'use client'

import { useState, useEffect } from 'react'
import { useOnboardingStore } from '@/lib/store'
import OnboardingWizard from '@/components/OnboardingWizard'

const TOTAL_STEPS = 15

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const { getAllData, auth } = useOnboardingStore()
  
  // Guard: redirect to email step if trying to access protected steps without verification
  useEffect(() => {
    // Steps 0, 1, 2 are public (welcome, email, OTP)
    // Steps 3+ require verification
    if (currentStep >= 3 && !auth.isVerified) {
      setCurrentStep(1) // Redirect to email step
    }
  }, [currentStep, auth.isVerified])
  
  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      // Guard: prevent going to protected steps without verification
      if (currentStep === 2 && !auth.isVerified) {
        // Can't proceed from OTP step without verification
        return
      }
      if (currentStep >= 2 && !auth.isVerified) {
        // Can't proceed to protected steps without verification
        setCurrentStep(1) // Redirect to email step
        return
      }
      setCurrentStep(currentStep + 1)
    }
  }
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  return (
    <div className="min-h-screen bg-white">
      <OnboardingWizard
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  )
}
