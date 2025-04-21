import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"

// The Firebase Admin SDK configuration should be stored in environment variables
// for security reasons. Here we're initializing with a JSON object, but in production
// you should use environment variables.

const serviceAccount = {
  type: "service_account",
  project_id: "sierraexplore-21919",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: "firebase-adminsdk-fbsvc@sierraexplore-21919.iam.gserviceaccount.com",
  client_id: "109645712021997224173",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40sierraexplore-21919.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
}

// Initialize Firebase Admin
function initializeFirebaseAdmin() {
  if (!getApps().length) {
    try {
      const app = initializeApp({
        credential: cert(serviceAccount as any),
        databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
      })

      console.log("Firebase Admin initialized successfully")
      return app
    } catch (error) {
      console.error("Error initializing Firebase Admin:", error)
      return null
    }
  }

  return getApps()[0]
}

// Initialize the app
const app = initializeFirebaseAdmin()

// Get Firestore instance
export const adminDb = app ? getFirestore() : null

// Get Auth instance
export const adminAuth = app ? getAuth() : null

// Helper functions for server-side operations
export async function verifyIdToken(token: string) {
  if (!adminAuth) {
    throw new Error("Firebase Admin Auth is not initialized")
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token)
    return decodedToken
  } catch (error) {
    console.error("Error verifying ID token:", error)
    throw error
  }
}

export async function getUser(uid: string) {
  if (!adminAuth) {
    throw new Error("Firebase Admin Auth is not initialized")
  }

  try {
    const userRecord = await adminAuth.getUser(uid)
    return userRecord
  } catch (error) {
    console.error("Error getting user:", error)
    throw error
  }
}

export async function createUser(email: string, password: string, displayName?: string) {
  if (!adminAuth) {
    throw new Error("Firebase Admin Auth is not initialized")
  }

  try {
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName,
      emailVerified: false,
    })
    return userRecord
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}
