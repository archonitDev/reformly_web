'use client'

import { useState } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'

interface Step12RatingModalProps {
  onNext: () => void
  onBack: () => void
}

export default function Step12RatingModal({ onNext }: Step12RatingModalProps) {
  const { setRating } = useOnboardingStore()
  const [showModal, setShowModal] = useState(true)
  
  const handleRateNow = () => {
    setRating({ dismissed: false })
    setShowModal(false)
    setTimeout(() => onNext(), 300)
  }
  
  const handleNotNow = () => {
    setRating({ dismissed: true })
    setShowModal(false)
    setTimeout(() => onNext(), 300)
  }
  
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={handleNotNow}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
                <h3 className="text-2xl font-bold text-center mb-6">
                  Enjoying Reformly?
                </h3>
                
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleRateNow}
                  >
                    Rate now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={handleNotNow}
                  >
                    Not now
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Background content (hidden while modal is open) */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-400">Loading...</div>
      </div>
    </div>
  )
}
