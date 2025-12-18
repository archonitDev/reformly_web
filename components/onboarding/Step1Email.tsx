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
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          Log in to your Account or Create a new Account
        </h2>
        
        <div className="mb-8">
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
      </div>
      
      <div className="sticky bottom-0 pb-6 pt-4 bg-white border-t border-gray-100">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleContinue}
          isLoading={isLoading}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
