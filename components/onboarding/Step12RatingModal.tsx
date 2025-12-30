'use client'

import { useMemo } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'
import Image from 'next/image'

interface Step12RatingModalProps {
  onNext: () => void
  onBack: () => void
}

export default function Step12RatingModal({ onNext }: Step12RatingModalProps) {
  const { metrics } = useOnboardingStore()

  // Calculate dates
  const dates = useMemo(() => {
    const today = new Date()
    const sixWeeksLater = new Date(today)
    sixWeeksLater.setDate(today.getDate() + 42) // 6 weeks = 42 days
    const twelveWeeksLater = new Date(today)
    twelveWeeksLater.setDate(today.getDate() + 84) // 12 weeks = 84 days

    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      return `${day}/${month}`
    }

    const formatGoalDate = (date: Date) => {
      const day = date.getDate()
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const month = months[date.getMonth()]
      const year = date.getFullYear()
      return `${day} ${month} ${year}`
    }

    return {
      today: formatDate(today),
      sixWeeks: formatDate(sixWeeksLater),
      twelveWeeks: formatDate(twelveWeeksLater),
      goalDate: formatGoalDate(twelveWeeksLater),
    }
  }, [])

  // Get weight values and unit
  const goalWeight = metrics.goalWeight?.value || 59
  const unit = metrics.goalWeight?.unit === 'lb' ? 'lbs' : 'kg'

  // Convert current weight to same unit as goal weight if needed
  const currentWeightDisplay = useMemo(() => {
    if (!metrics.currentWeight?.value) {
      // If no current weight, use goalWeight + 10% as example
      return goalWeight * 1.1
    }
    if (metrics.currentWeight.unit === metrics.goalWeight?.unit) {
      return metrics.currentWeight.value
    }
    // Convert if units differ
    if (metrics.currentWeight.unit === 'kg' && metrics.goalWeight?.unit === 'lb') {
      return Math.round(metrics.currentWeight.value * 2.20462)
    } else if (metrics.currentWeight.unit === 'lb' && metrics.goalWeight?.unit === 'kg') {
      return Math.round(metrics.currentWeight.value * 0.453592)
    }
    return metrics.currentWeight.value
  }, [metrics.currentWeight, metrics.goalWeight, goalWeight])

  return (
    <div className="flex flex-col h-full">
      <h2 className="font-plus-jakarta text-2xl sm:text-3xl md:text-[40px] font-bold leading-tight sm:leading-[48px] mb-3 sm:mb-4 text-center text-gray-800 mx-auto px-2" style={{ width: '115%', marginLeft: '-7.5%', marginRight: '-7.5%' }}>
        Your step-by-step wellness journey
      </h2>
      <div className="flex flex-col justify-start flex-1 px-4 sm:px-6 md:px-8 lg:px-10 pt-3 sm:pt-4 pb-6 sm:pb-8 md:pb-10">
        <p className="text-sm sm:text-base text-gray-800 mb-4 sm:mb-6 text-center px-2">
          We&apos;ll create a plan to help you reach your goal of:
        </p>

        {/* Goal weight pill - above the graph */}
        <div className="flex justify-center mb-4 sm:mb-6 px-2">
          <div className="bg-primary-light rounded-full px-4 sm:px-6 py-1.5 sm:py-2 inline-block">
            <span className="text-primary font-semibold text-sm sm:text-base md:text-lg">
              {Math.round(goalWeight)} {unit} by {dates.goalDate}
            </span>
          </div>
        </div>

        {/* Graph container */}
        <div className="flex justify-center mb-0 relative mx-auto px-2" style={{ width: '100%', maxWidth: '320px', height: 'auto', aspectRatio: '320/127' }}>
          {/* Background graph */}
          <div className="absolute inset-0">
            <Image
              src="/logos/graph_1.svg"
              alt="Graph background"
              width={287}
              height={127}
              className="w-full h-full"
            />
          </div>
          
          {/* Overlay line graph */}
          <div className="absolute z-1" style={{ top: '-12px', left: '2px', right: '2px', bottom: '2px' }}>
            <Image
              src="/logos/line_graph_1.svg"
              alt="Line graph overlay"
              width={316}
              height={106}
              className="w-full h-full object-contain"
              style={{ objectPosition: 'center' }}
            />
          </div>
          
          {/* Left weight label - weight number in pink oval shape (left point of the graph) */}
          <div
            className="absolute bg-pink-accent rounded-lg px-3 py-1.5 text-center z-10"
            style={{
              left: '13px',
              top: '0px',
              transform: 'translateX(-50%)',
            }}
          >
            <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
              {Math.round(currentWeightDisplay)} {unit}
            </span>
          </div>
          
          {/* Right check mark - checkmark logo in purple circle (end point of the graph) */}
          <div
            className="absolute z-10 flex items-center justify-center"
            style={{
              right: '2px',
              top: 'calc(-8px + 98.6% - 12px)',
              transform: 'translate(50%, -50%)',
            }}
          >
            <Image
              src="/logos/check_graph_1.svg"
              alt="check"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
        </div>

        {/* Date labels - three gradations under the graph, aligned exactly under the graph */}
        <div className="relative mb-3 sm:mb-4 mx-auto px-2" style={{ width: '100%', maxWidth: '287px', height: '24px', marginTop: '12px' }}>
          <div className="absolute font-plus-jakarta text-sm sm:text-base font-bold text-gray-600" style={{ left: '13px', top: '0', transform: 'translateX(-50%)', lineHeight: '24px', height: '24px' }}>
            {dates.today}
          </div>
          <div className="absolute font-plus-jakarta text-sm sm:text-base font-bold text-gray-600" style={{ left: '144px', top: '0', transform: 'translateX(-50%)', lineHeight: '24px', height: '24px' }}>
            {dates.sixWeeks}
          </div>
          <div className="absolute font-plus-jakarta text-sm sm:text-base font-bold text-gray-600" style={{ left: '274px', top: '0', transform: 'translateX(-50%)', lineHeight: '24px', height: '24px' }}>
            {dates.twelveWeeks}
          </div>
        </div>
        {/* Disclaimer */}
        <p className="text-[10px] sm:text-xs text-gray-500 text-center mb-3 sm:mb-4 px-2 sm:px-4">
          *This estimate is based on tracked user progress. Check with your physician before starting. Following exercises, your plan, and meal plan impacts results.
        </p>

        

        {/* Next button */}
        <div className="mt-auto">
          <div className="flex justify-center px-2 sm:px-4">
            <div className="w-full max-w-md">
              <Button
                variant="primary"
                className="w-full py-2.5 text-sm sm:text-base md:min-w-[300px] bg-black-button text-white hover:bg-gray-800"
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
