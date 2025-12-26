// API functions for onboarding

import { apiClient, ApiClientError } from './apiClient'
import { setBackendTokens } from './apiClient'

export interface ApiResponse<T = any> {
  ok: boolean
  data?: T
  error?: string
}

export interface VerifyOtpResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    email: string
    role: string
  }
}

export interface AuthMeResponse {
  id: string
  email: string
  username?: string
  bio?: string
  name?: string
  role: string
}

export const sendEmailOtp = async (email: string): Promise<ApiResponse> => {
  try {
    await apiClient('/auth/request-otp', {
      method: 'POST',
      useFirebaseToken: true,
      body: JSON.stringify({ email }),
    })
    return { ok: true }
  } catch (error) {
    const message = error instanceof ApiClientError ? error.message : 'Failed to send OTP'
    return { ok: false, error: message }
  }
}

export const verifyEmailOtp = async (email: string, code: string): Promise<ApiResponse<VerifyOtpResponse>> => {
  try {
    const data = await apiClient<VerifyOtpResponse>('/auth/verify-otp', {
      method: 'POST',
      useFirebaseToken: true,
      body: JSON.stringify({ email, code }),
    })
    
    // Store backend tokens
    if (data.accessToken && data.refreshToken) {
      setBackendTokens(data.accessToken, data.refreshToken)
    }
    
    return { ok: true, data }
  } catch (error) {
    const message = error instanceof ApiClientError ? error.message : 'Invalid verification code'
    return { ok: false, error: message }
  }
}

export const getAuthMe = async (): Promise<ApiResponse<AuthMeResponse>> => {
  try {
    const data = await apiClient<AuthMeResponse>('/auth/me', {
      method: 'GET',
    })
    return { ok: true, data }
  } catch (error) {
    const message = error instanceof ApiClientError ? error.message : 'Failed to get user data'
    return { ok: false, error: message }
  }
}

export const submitOnboarding = async (payload: any): Promise<ApiResponse> => {
  console.log('[API] submitOnboarding called with payload:', JSON.stringify(payload, null, 2))
  try {
    const response = await apiClient('/users/finish-onboarding', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    console.log('[API] submitOnboarding success:', response)
    return { ok: true }
  } catch (error) {
    console.error('[API] submitOnboarding error:', error)
    const message = error instanceof ApiClientError ? error.message : 'Failed to submit onboarding'
    if (error instanceof ApiClientError && error.status) {
      console.error('[API] Error status:', error.status)
      console.error('[API] Error message:', error.message)
    }
    return { ok: false, error: message }
  }
}

export const createStripeCheckoutSession = async (planId: string): Promise<ApiResponse<{ url?: string }>> => {
  try {
    const data = await apiClient<{ url?: string }>('/payments/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ planId }),
    })
    return { ok: true, data }
  } catch (error) {
    const message = error instanceof ApiClientError ? error.message : 'Failed to create checkout session'
    return { ok: false, error: message }
  }
}
