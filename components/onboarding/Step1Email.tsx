'use client'

import { useState } from 'react'
import Button from '../Button'
import Input from '../Input'
import { useOnboardingStore } from '@/lib/store'
import { sendEmailOtp } from '@/lib/api'
import { ensureFirebaseUser } from '@/lib/firebase'

interface Step1EmailProps {
  onNext: () => void
  onBack: () => void
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export default function Step1Email({ onNext }: Step1EmailProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setAuth } = useOnboardingStore()
  
  const handleContinue = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    setError(null)
    setIsLoading(true)
    
    try {
      // Try to ensure Firebase user is initialized (may fail if anonymous auth is disabled)
      // This is not critical - the backend may not require Firebase token
      try {
        await ensureFirebaseUser()
      } catch (firebaseError) {
        console.warn('Firebase initialization failed, continuing without Firebase token:', firebaseError)
      }
      
      // Save email to store
      // Important: reset verification state so user can't skip OTP step
      // (store is persisted and may contain isVerified=true from a previous session)
      setAuth({ email, provider: 'email', isVerified: false })
      
      // Always send OTP, regardless of whether user was onboarded before
      const otpResult = await sendEmailOtp(email)
      if (otpResult.ok) {
        onNext()
      } else {
        setError(otpResult.error || 'Failed to send verification code')
      }
    } catch (error: any) {
      console.error('Failed to send OTP:', error)
      
      // Check if it's a Firebase configuration error
      if (error?.message?.includes('Missing required Firebase environment variables') || 
          error?.code === 'auth/invalid-api-key' ||
          error?.message?.includes('Firebase')) {
        setError('Firebase configuration error. Please check your environment variables and restart the dev server.')
      } else {
        setError('Failed to send verification code. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const isEmailValid = validateEmail(email)
  
  return (
    <div className="flex flex-col h-full px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col justify-start" style={{ paddingTop: '29.76px' }}>
        <h2 className="font-plus-jakarta text-2xl sm:text-3xl md:text-[40px] font-bold leading-tight sm:leading-[48px] mb-6 sm:mb-8 text-center text-gray-800 px-2">
          Log in to your Account or Create a new Account
        </h2>
        
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError(null)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && isEmailValid && !isLoading) {
                handleContinue()
              }
            }}
            autoFocus
          />
          {error && (
            <p className="text-xs text-red-500 mt-2 text-center">{error}</p>
          )}
        </div>
        
        <div className="mt-4">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleContinue}
            isLoading={isLoading}
            disabled={!isEmailValid}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
