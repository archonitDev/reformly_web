import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth, signInAnonymously, User } from 'firebase/auth'

let app: FirebaseApp | undefined
let auth: Auth | undefined

export const initFirebase = (): Auth => {
  if (auth) {
    return auth
  }

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
  }

  // Validate required environment variables
  const missingVars: string[] = []
  if (!firebaseConfig.apiKey) missingVars.push('NEXT_PUBLIC_FIREBASE_API_KEY')
  if (!firebaseConfig.authDomain) missingVars.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN')
  if (!firebaseConfig.projectId) missingVars.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID')
  if (!firebaseConfig.storageBucket) missingVars.push('NEXT_PUBLIC_STORAGE_BUCKET')
  if (!firebaseConfig.messagingSenderId) missingVars.push('NEXT_PUBLIC_MESSAGING_SENDER_ID')
  if (!firebaseConfig.appId) missingVars.push('NEXT_PUBLIC_APP_ID')

  if (missingVars.length > 0) {
    const errorMessage = `Missing required Firebase environment variables: ${missingVars.join(', ')}. Please check your .env.local file and restart the dev server.`
    console.error(errorMessage)
    throw new Error(errorMessage)
  }

  // Check if Firebase is already initialized
  if (getApps().length === 0) {
    try {
      app = initializeApp(firebaseConfig)
    } catch (error) {
      console.error('Failed to initialize Firebase:', error)
      throw error
    }
  } else {
    app = getApps()[0]
  }

  auth = getAuth(app)
  return auth
}

export const getFirebaseAuth = (): Auth => {
  if (!auth) {
    return initFirebase()
  }
  return auth
}

export const getFirebaseIdToken = async (forceRefresh: boolean = false): Promise<string | null> => {
  const authInstance = getFirebaseAuth()
  const user = authInstance.currentUser

  if (!user) {
    // Sign in anonymously if no user
    try {
      const result = await signInAnonymously(authInstance)
      return await result.user.getIdToken(forceRefresh)
    } catch (error: any) {
      // Check if anonymous auth is disabled - this is expected and handled gracefully
      if (error?.code === 'auth/admin-restricted-operation' || error?.code === 'auth/operation-not-allowed') {
        // Silent fail - anonymous auth is disabled, backend may not require Firebase token
        return null
      }
      // Only log unexpected errors
      if (error?.code !== 'auth/admin-restricted-operation' && error?.code !== 'auth/operation-not-allowed') {
        console.error('Failed to sign in anonymously:', error)
      }
      return null
    }
  }

  try {
    return await user.getIdToken(forceRefresh)
  } catch (error) {
    console.error('Failed to get ID token:', error)
    return null
  }
}

export const ensureFirebaseUser = async (): Promise<User | null> => {
  const authInstance = getFirebaseAuth()
  let user = authInstance.currentUser

  if (!user) {
    try {
      const result = await signInAnonymously(authInstance)
      user = result.user
    } catch (error: any) {
      // Check if anonymous auth is disabled - this is expected and handled gracefully
      if (error?.code === 'auth/admin-restricted-operation' || error?.code === 'auth/operation-not-allowed') {
        // Silent fail - anonymous auth is disabled, continuing without Firebase user
        return null
      }
      // Only log unexpected errors
      if (error?.code !== 'auth/admin-restricted-operation' && error?.code !== 'auth/operation-not-allowed') {
        console.error('Failed to sign in anonymously:', error)
      }
      return null
    }
  }

  return user
}

