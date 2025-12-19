'use client'

import { useState, useRef, useEffect } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'
import { verifyEmailOtp } from '@/lib/api'

interface Step2OTPProps {
  onNext: () => void
  onBack: () => void
}

export default function Step2OTP({ onNext }: Step2OTPProps) {
  const [codes, setCodes] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(97) // 1:37 in seconds
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { auth, setAuth } = useOnboardingStore()
  
  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  
  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return
    if (!/^\d*$/.test(value)) return
    
    const newCodes = [...codes]
    newCodes[index] = value
    setCodes(newCodes)
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }
  
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').slice(0, 6)
    if (/^\d+$/.test(pasted)) {
      const newCodes = pasted.split('').concat(Array(6 - pasted.length).fill(''))
      setCodes(newCodes.slice(0, 6))
      inputRefs.current[Math.min(pasted.length, 5)]?.focus()
    }
  }
  
  const handleContinue = async () => {
    const code = codes.join('')
    if (code.length !== 6) return
    
    setIsLoading(true)
    try {
      const result = await verifyEmailOtp(auth.email, code)
      if (result.ok) {
        setAuth({ isVerified: true })
        onNext()
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          Verification code
        </h2>
        
        <div className="flex gap-3 justify-center mb-8">
          {codes.map((code, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={code}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-14 text-center text-2xl font-semibold rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              autoFocus={index === 0}
            />
          ))}
        </div>
        
        <div className="text-center text-sm text-gray-600">
          {resendTimer > 0 ? (
            <span>Resend Code in {formatTimer(resendTimer)}</span>
          ) : (
            <button
              className="text-primary font-medium hover:underline"
              onClick={() => {
                setResendTimer(97)
                // Mock resend
              }}
            >
              Resend Code
            </button>
          )}
        </div>
      </div>
      
      <div className="sticky bottom-0 pb-2 pt-4 bg-white border-t border-gray-100">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleContinue}
          isLoading={isLoading}
          disabled={codes.join('').length !== 6}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
