'use client'

import { useState, useEffect } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'

interface Step4BirthdayProps {
  onNext: () => void
  onBack: () => void
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const daysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate()
}

export default function Step4Birthday({ onNext }: Step4BirthdayProps) {
  const { aboutYou, setAboutYou } = useOnboardingStore()
  const [day, setDay] = useState<number | ''>('')
  const [month, setMonth] = useState<number | ''>('')
  const [year, setYear] = useState<number | ''>('')
  
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
  const maxDays = month !== '' && year !== '' 
    ? daysInMonth(Number(month) - 1, Number(year))
    : 31
  const days = Array.from({ length: maxDays }, (_, i) => i + 1)
  
  useEffect(() => {
    // Reset day if it exceeds the number of days in the selected month
    if (day && month && year && Number(day) > maxDays) {
      setDay('')
    }
  }, [month, year, maxDays, day])
  
  useEffect(() => {
    if (day && month && year) {
      const date = new Date(Number(year), Number(month) - 1, Number(day))
      setAboutYou({ birthday: date })
    }
  }, [day, month, year, setAboutYou])
  
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">
          When is your birthday?
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">Date of birth</p>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Day</label>
            <select
              value={day}
              onChange={(e) => {
                setDay(e.target.value ? Number(e.target.value) : '')
              }}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Day</option>
              {days.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Month</label>
            <select
              value={month}
              onChange={(e) => {
                setMonth(e.target.value ? Number(e.target.value) : '')
              }}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Month</option>
              {months.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Year</label>
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value ? Number(e.target.value) : '')
              }}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="bg-primary-light rounded-2xl p-4 mb-4">
          <p className="text-sm text-gray-700">
            Creating your personal plan based on your preferences...
          </p>
        </div>
      </div>
      
      <div className="sticky bottom-0 pb-6 pt-4 bg-white border-t border-gray-100">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
