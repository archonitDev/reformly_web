'use client'

interface Step0WelcomeProps {
  onNext: () => void
  onBack: () => void
}

export default function Step0Welcome({ onNext }: Step0WelcomeProps) {
  const handleEmail = () => {
    onNext()
  }
  
  const handleGoogle = () => {
    // Mock for Google
    console.log('Google auth')
  }
  
  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Header with logo - full width */}
      <div className="w-full px-6 pt-6 pb-4">
        <h1 className="font-plus-jakarta text-[28px] font-bold leading-[33.6px] text-black ml-10">reformly</h1>
        <div className="mt-4 border-t border-gray-200 w-full"></div>
      </div>
      
      {/* Main content - centered but full width container */}
      <div className="flex-1 flex flex-col items-center justify-start w-full px-4 sm:px-6 py-6 sm:py-8" style={{ paddingTop: '29.76px' }}>
        <h2 className="font-plus-jakarta text-2xl sm:text-3xl md:text-[40px] font-bold leading-tight sm:leading-[48px] mb-8 sm:mb-12 text-center text-gray-800 px-2">
          Log in to your Account or<br />
          Create a new Account
        </h2>
        
        <div className="w-full space-y-4 flex items-center justify-center">
          <div className="w-full max-w-md space-y-4">
            {/* Email Button */}
            <button
              onClick={handleEmail}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-black rounded-full bg-white text-black font-normal hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Continue with Email</span>
            </button>
            
            {/* Google Button */}
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-black rounded-full bg-white text-black font-normal hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
