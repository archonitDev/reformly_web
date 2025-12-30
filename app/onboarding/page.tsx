'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useOnboardingStore } from '@/lib/store'
import OnboardingWizard from '@/components/OnboardingWizard'

const TOTAL_STEPS = 15

function OnboardingContent() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const { getAllData, auth } = useOnboardingStore()
  
  // Handle step query parameter (e.g., ?step=15 to go directly to step 15)
  useEffect(() => {
    const stepParam = searchParams.get('step')
    if (stepParam) {
      const step = parseInt(stepParam, 10)
      if (!isNaN(step) && step >= 0 && step < TOTAL_STEPS) {
        setCurrentStep(step)
      }
    }
  }, [searchParams])
  
  // Guard: redirect to email step if trying to access protected steps without verification
  useEffect(() => {
    // Steps 0, 1, 2 are public (welcome, email, OTP)
    // Steps 3+ require verification
    // Skip guard if user just authenticated with Google (they should go to step 3)
    if (currentStep >= 3 && !auth.isVerified && auth.provider !== 'google') {
      setCurrentStep(1) // Redirect to email step
    }
  }, [currentStep, auth.isVerified, auth.provider])
  
  // Auto-advance from step 2 (OTP) to step 3 when verification is complete
  useEffect(() => {
    if (currentStep === 2 && auth.isVerified) {
      console.log('[OnboardingPage] User verified, auto-advancing to step 3')
      setCurrentStep(3)
    }
  }, [auth.isVerified, currentStep])
  
  // Auto-advance to step 3 when Google auth is complete (skip email/OTP steps)
  useEffect(() => {
    if (auth.isVerified && auth.provider === 'google' && currentStep <= 2) {
      console.log('[OnboardingPage] Google auth complete, skipping to step 3')
      setCurrentStep(3)
    }
  }, [auth.isVerified, auth.provider, currentStep])
  
  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      // Guard: prevent going to protected steps without verification
      // Note: Step 2 (OTP) auto-advances via useEffect when verified, so we skip the check here
      if (currentStep > 2 && !auth.isVerified) {
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

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  )
}
