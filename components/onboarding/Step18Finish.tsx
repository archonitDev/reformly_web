'use client'

import { useEffect } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'
import { submitOnboarding } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface Step18FinishProps {
  onNext: () => void
  onBack: () => void
}

export default function Step18Finish({ onNext }: Step18FinishProps) {
  const { getAllData, profile } = useOnboardingStore()
  const router = useRouter()
  
  useEffect(() => {
    // Submit data when the final screen loads
    const submitData = async () => {
      const allData = getAllData()
      try {
        await submitOnboarding(allData)
        console.log('Onboarding data submitted:', allData)
      } catch (error) {
        console.error('Failed to submit onboarding:', error)
      }
    }
    
    submitData()
  }, [getAllData])
  
  const handleGoToDashboard = () => {
    router.push('/app')
  }
  
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center mb-6"
        >
          <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-4 text-gray-800"
        >
          You&apos;re all set!
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 mb-12"
        >
          Welcome to Reformly, {profile.username || 'there'}! Your personalized wellness journey starts now.
        </motion.p>
      </div>
      
      <div className="sticky bottom-0 pb-2 pt-4 bg-white border-t border-gray-100">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleGoToDashboard}
        >
          Go to dashboard
        </Button>
      </div>
    </div>
  )
}
