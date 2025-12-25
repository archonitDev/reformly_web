'use client'

import { useState } from 'react'
import Button from '../Button'
import Input from '../Input'
import { useOnboardingStore } from '@/lib/store'
import { sendEmailOtp } from '@/lib/api'

interface Step1EmailProps {
  onNext: () => void
  onBack: () => void
}

export default function Step1Email({ onNext }: Step1EmailProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setAuth } = useOnboardingStore()
  
  const handleContinue = async () => {
    setIsLoading(true)
    setAuth({ email, provider: 'email' })
    
    try {
      await sendEmailOtp(email)
      onNext()
    } catch (error) {
      console.error('Failed to send OTP:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
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
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleContinue()
              }
            }}
            autoFocus
          />
        </div>
        
        <div className="mt-4">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleContinue}
            isLoading={isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
