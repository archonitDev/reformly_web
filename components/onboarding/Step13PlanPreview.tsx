'use client'

import { useEffect } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'
import { motion } from 'framer-motion'

interface Step13PlanPreviewProps {
  onNext: () => void
  onBack: () => void
}

export default function Step13PlanPreview({ onNext }: Step13PlanPreviewProps) {
  const { aboutYou, metrics, setPlanPreview } = useOnboardingStore()
  
  useEffect(() => {
    // Generate mock data for the chart
    const durationWeeks = 12
    const startWeight = 66
    const goalWeight = metrics.goalWeight.value || 59
    const chartData = Array.from({ length: durationWeeks + 1 }, (_, i) => ({
      week: i,
      weight: startWeight - ((startWeight - goalWeight) * i) / durationWeeks,
      date: new Date(Date.now() + i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }))
    
    setPlanPreview({
      durationWeeks,
      goalLabel: aboutYou.mainGoal || 'Lose Weight',
      interestsLabel: aboutYou.activities.slice(0, 2).join(' & ') || 'General Fitness',
      chartData,
    })
  }, [aboutYou, metrics, setPlanPreview])
  
  const { planPreview } = useOnboardingStore()
  
  const chartData = planPreview.chartData.length > 0 ? planPreview.chartData : [
    { week: 0, weight: 66, date: 'Today' },
    { week: 12, weight: 59, date: '12 weeks' },
  ]
  
  const maxWeight = Math.max(...chartData.map(d => d.weight))
  const minWeight = Math.min(...chartData.map(d => d.weight))
  const range = maxWeight - minWeight || 1
  
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">
          Your step-by-step wellness journey
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          We&apos;ll create a plan to help you reach your goal of: {planPreview.goalLabel}
        </p>
        
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-gray-100">
          <div className="h-48 relative">
            {/* Chart */}
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5630B0" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#5630B0" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Area under the chart */}
              <path
                d={`M 0,200 ${chartData.map((d, i) => {
                  const x = (i / (chartData.length - 1)) * 400
                  const y = 200 - ((d.weight - minWeight) / range) * 180
                  return `L ${x},${y}`
                }).join(' ')} L 400,200 Z`}
                fill="url(#gradient)"
              />
              
              {/* Chart line */}
              <polyline
                points={chartData.map((d, i) => {
                  const x = (i / (chartData.length - 1)) * 400
                  const y = 200 - ((d.weight - minWeight) / range) * 180
                  return `${x},${y}`
                }).join(' ')}
                fill="none"
                stroke="#5630B0"
                strokeWidth="3"
              />
            </svg>
            
            {/* Weight labels */}
            {chartData.filter((_, i) => i === 0 || i === chartData.length - 1).map((d, idx) => {
              const i = idx === 0 ? 0 : chartData.length - 1
              const x = (i / (chartData.length - 1)) * 100
              const y = 200 - ((d.weight - minWeight) / range) * 180
              return (
                <div
                  key={i}
                  className="absolute bg-primary text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap"
                  style={{
                    left: `${x}%`,
                    top: `${(y / 200) * 100}%`,
                    transform: 'translate(-50%, -100%)',
                  }}
                >
                  {d.weight.toFixed(1)} kg by {d.date}
                </div>
              )
            })}
          </div>
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
