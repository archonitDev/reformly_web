// API mocks for onboarding

export interface ApiResponse<T = any> {
  ok: boolean
  data?: T
  error?: string
}

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const sendEmailOtp = async (email: string): Promise<ApiResponse> => {
  await delay(300 + Math.random() * 500)
  console.log('[API Mock] sendEmailOtp:', email)
  return { ok: true }
}

export const verifyEmailOtp = async (email: string, code: string): Promise<ApiResponse> => {
  await delay(300 + Math.random() * 500)
  console.log('[API Mock] verifyEmailOtp:', email, code)
  // Mock: accepts any 6-digit code
  if (code.length === 6 && /^\d+$/.test(code)) {
    return { ok: true }
  }
  return { ok: false, error: 'Invalid code' }
}

export const submitOnboarding = async (payload: any): Promise<ApiResponse> => {
  await delay(500 + Math.random() * 300)
  console.log('[API Mock] submitOnboarding:', JSON.stringify(payload, null, 2))
  return { ok: true }
}

export const createStripeCheckoutSession = async (planId: string): Promise<ApiResponse<{ url?: string }>> => {
  await delay(400 + Math.random() * 400)
  console.log('[API Mock] createStripeCheckoutSession:', planId)
  return { 
    ok: true, 
    data: { 
      url: `https://checkout.stripe.com/mock-session-${planId}` 
    } 
  }
}
