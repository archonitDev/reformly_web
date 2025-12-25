'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'

interface Step4BirthdayProps {
  onNext: () => void
  onBack: () => void
}

export default function Step4Birthday({ onNext }: Step4BirthdayProps) {
  const { aboutYou, setAboutYou } = useOnboardingStore()
  const [dateValue, setDateValue] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  
  // Format date from store if exists
  useEffect(() => {
    if (aboutYou.birthday) {
      const day = String(aboutYou.birthday.getDate()).padStart(2, '0')
      const month = String(aboutYou.birthday.getMonth() + 1).padStart(2, '0')
      const year = aboutYou.birthday.getFullYear()
      setDateValue(`${day}.${month}.${year}`)
    }
  }, [aboutYou.birthday])
  
  const validateDate = (dateStr: string): boolean => {
    // Remove all dots to get just digits
    const digitsOnly = dateStr.replace(/\./g, '')
    
    // Must be exactly 8 digits (DDMMYYYY)
    if (digitsOnly.length !== 8 || !/^\d{8}$/.test(digitsOnly)) {
      return false
    }
    
    const day = parseInt(digitsOnly.substring(0, 2), 10)
    const month = parseInt(digitsOnly.substring(2, 4), 10)
    const year = parseInt(digitsOnly.substring(4, 8), 10)
    
    // Validate ranges
    if (month < 1 || month > 12) return false
    if (day < 1 || day > 31) return false
    
    // Validate year (reasonable range)
    const currentYear = new Date().getFullYear()
    if (year < 1900 || year > currentYear) return false
    
    // Validate actual date
    const date = new Date(year, month - 1, day)
    if (
      date.getDate() !== day ||
      date.getMonth() !== month - 1 ||
      date.getFullYear() !== year
    ) {
      return false
    }
    
    return true
  }
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '')
    
    // Limit to 8 digits
    const limitedDigits = digitsOnly.substring(0, 8)
    
    // Auto-format with dots
    let formatted = ''
    if (limitedDigits.length > 0) {
      formatted = limitedDigits.substring(0, 2) // DD
      if (limitedDigits.length > 2) {
        formatted += '.' + limitedDigits.substring(2, 4) // DD.MM
        if (limitedDigits.length > 4) {
          formatted += '.' + limitedDigits.substring(4, 8) // DD.MM.YYYY
        }
      }
    }
    
    setDateValue(formatted)
    setError(null)
  }
  
  const handleBlur = () => {
    if (dateValue && !validateDate(dateValue)) {
      setError('Please enter a valid date in DD.MM.YYYY format')
    } else if (dateValue && validateDate(dateValue)) {
      const digitsOnly = dateValue.replace(/\./g, '')
      const day = parseInt(digitsOnly.substring(0, 2), 10)
      const month = parseInt(digitsOnly.substring(2, 4), 10)
      const year = parseInt(digitsOnly.substring(4, 8), 10)
      const date = new Date(year, month - 1, day)
      setAboutYou({ birthday: date })
      setError(null)
    }
  }
  
  return (
    <div className="flex flex-col h-full px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col justify-start" style={{ paddingTop: '29.76px' }}>
        <h2 className="font-plus-jakarta text-2xl sm:text-3xl md:text-[40px] font-bold leading-tight sm:leading-[48px] mb-2 text-center text-gray-800 px-2">
          When is your birthday?
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 text-center mb-6 sm:mb-8">Date of birth</p>
        
        <div className="flex flex-col items-center mb-8">
          {/* Date input field */}
          <div className="w-full max-w-md">
            <input
              type="text"
              inputMode="numeric"
              value={dateValue}
              onChange={handleDateChange}
              onBlur={handleBlur}
              placeholder="DD.MM.YYYY"
              maxLength={10}
              className={`
                w-full px-4 py-4 rounded-2xl border-2 text-center text-lg font-bold text-gray-800
                focus:outline-none focus:ring-2 transition-all
                ${error 
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-primary focus:ring-primary/20'
                }
              `}
            />
            {error && (
              <p className="text-xs text-red-500 mt-2 text-center">{error}</p>
            )}
          </div>
        </div>
        
        {/* Information message */}
        <div className="bg-primary-light rounded-2xl p-3 sm:p-4 max-w-md mx-auto mb-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0">
              <Image
                src="/logos/stars.svg"
                alt="Stars"
                width={20}
                height={20}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-primary mb-1">
                Creating your personal plan
              </p>
              
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-0">
                People tend to have a higher body-fat percentage as they age, even at identical BMIs.
              </p>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-center px-2 sm:px-4">
            <div className="w-full max-w-md">
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
