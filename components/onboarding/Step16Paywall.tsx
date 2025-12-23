'use client'

import { useState } from 'react'
import Button from '../Button'
import { useOnboardingStore } from '@/lib/store'
import { createStripeCheckoutSession } from '@/lib/api'
import { motion } from 'framer-motion'

interface Step16PaywallProps {
  onNext: () => void
  onBack: () => void
}

const plans = [
  {
    id: 'monthly-1',
    label: '1 month',
    price: '$9.99',
    period: '/month',
    badge: null,
  },
  {
    id: 'monthly-6',
    label: '6 months',
    price: '$7.99',
    period: '/month',
    badge: '20% sale',
    popular: true,
  },
  {
    id: 'yearly',
    label: '1 year',
    price: '$6.99',
    period: '/month',
    badge: '20% sale',
  },
]

const timeline = [
  {
    day: 'Today',
    text: "Unlock all premium features for free right now. No hidden costs.",
  },
  {
    day: 'Day 5',
    text: "We'll send a reminder before your trial ends.",
  },
  {
    day: 'Day 7',
    text: "Subscription starts. You're free to cancel anytime before this date.",
  },
]

export default function Step16Paywall({ onNext }: Step16PaywallProps) {
  const { subscription, setSubscription } = useOnboardingStore()
  const [selectedPlan, setSelectedPlan] = useState<string>(subscription.selectedPlanId || 'monthly-6')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubscribe = async () => {
    setIsLoading(true)
    const plan = plans.find(p => p.id === selectedPlan)
    
    try {
      const result = await createStripeCheckoutSession(selectedPlan)
      if (result.ok) {
        setSubscription({
          selectedPlanId: selectedPlan,
          selectedPlanLabel: plan?.label || '',
          isSubscribed: true,
        })
        // In reality, there would be a redirect to Stripe here
        setTimeout(() => {
          onNext()
        }, 1000)
      }
    } catch (error) {
      console.error('Failed to create checkout session:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="flex flex-col h-full px-6 py-8 overflow-y-auto">
      <div style={{ paddingTop: '29.76px' }}>
        <h2 className="font-plus-jakarta text-[40px] font-bold leading-[48px] mb-8 text-center text-gray-800">
          How does trial work?
        </h2>
        
        {/* Timeline */}
        <div className="space-y-4 mb-8">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-primary" />
                {index < timeline.length - 1 && (
                  <div className="w-0.5 h-16 bg-primary-light" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="font-semibold text-gray-800 mb-1">{item.day}</div>
                <div className="text-sm text-gray-600">{item.text}</div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Plans */}
        <div className="space-y-3 mb-8">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id
            return (
              <motion.button
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`
                  w-full p-5 rounded-2xl border-2 text-left transition-all relative
                  ${isSelected
                    ? 'border-primary bg-primary-light'
                    : 'border-gray-200 bg-white hover:border-primary/50'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-lg">{plan.label}</div>
                  {plan.badge && (
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${isSelected ? 'bg-primary text-white' : 'bg-primary-light text-primary'}
                    `}>
                      {plan.badge}
                    </span>
                  )}
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-600 ml-1">{plan.period}</span>
                </div>
                {plan.popular && (
                  <div className="absolute top-2 right-2 text-xs text-primary font-medium">
                    Popular
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>
        
        <div className="mt-4">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleSubscribe}
            isLoading={isLoading}
          >
            Subscribe now
          </Button>
        </div>
      </div>
    </div>
  )
}
