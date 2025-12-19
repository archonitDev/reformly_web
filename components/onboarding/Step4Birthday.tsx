'use client'

import { useState, useEffect } from 'react'
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
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">
          When is your birthday?
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">Date of birth</p>
        
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
        <div className="bg-primary-light rounded-2xl p-4 max-w-md mx-auto">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary mb-1">
                Creating your personal plan
              </p>
              <p className="text-sm text-gray-700">
                People tend to have a higher body-fat percentage as they age, even at identical BMIs.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="sticky bottom-0 pb-2 pt-4 bg-white border-t border-gray-100">
        <div className="flex justify-center px-4">
          <div className="w-full max-w-md">
            <Button
              variant="primary"
              className="w-full py-2.5 text-base min-w-[300px]" 
              onClick={onNext}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
