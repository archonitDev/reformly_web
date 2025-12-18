'use client'

import Button from '../Button'

interface Step0WelcomeProps {
  onNext: () => void
  onBack: () => void
}

export default function Step0Welcome({ onNext }: Step0WelcomeProps) {
  const handleEmail = () => {
    onNext()
  }
  
  const handleApple = () => {
    // Mock for Apple
    console.log('Apple auth')
  }
  
  const handleGoogle = () => {
    // Mock for Google
    console.log('Google auth')
  }
  
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">reformly</h1>
        </div>
        
        <h2 className="text-2xl font-semibold mb-12 text-gray-800">
          Log in to your Account or Create a new Account
        </h2>
        
        <div className="w-full space-y-4 max-w-sm">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleEmail}
          >
            Continue with Email
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleApple}
          >
            Continue with Apple
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleGoogle}
          >
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  )
}
