'use client'

import { useState } from 'react'
import Button from '../Button'
import Input from '../Input'
import { useOnboardingStore } from '@/lib/store'

interface Step17UsernameProps {
  onNext: () => void
  onBack: () => void
}

export default function Step17Username({ onNext }: Step17UsernameProps) {
  const { profile, setProfile } = useOnboardingStore()
  const [username, setUsername] = useState(profile.username)
  const [bio, setBio] = useState(profile.bio)
  const [error, setError] = useState<string | null>(null)
  
  const handleContinue = () => {
    // Validation is not required now, but error structure is in place
    if (username.trim()) {
      setError(null)
      setProfile({ username, bio })
      onNext()
    } else {
      // Can show error, but not blocking
      setError('This name is already taken')
      setProfile({ username, bio })
      onNext()
    }
  }
  
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          To continue enter your username and tell about yourself
        </h2>
        
        <div className="space-y-4">
          <Input
            label="User Name"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              setError(null)
            }}
            error={error || undefined}
            autoFocus
          />
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Bio
            </label>
            <textarea
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>
        </div>
      </div>
      
      <div className="sticky bottom-0 pb-6 pt-4 bg-white border-t border-gray-100">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
