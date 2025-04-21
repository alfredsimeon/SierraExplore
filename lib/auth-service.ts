import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { getAuth, getFirestore } from "/lib/firebase"

export async function signUp(name: string, email: string, password: string): Promise<User> {
  const auth = await getAuth()
  const db = await getFirestore()

  if (!auth) {
    throw new Error("Authentication not initialized")
  }

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile with name
    await updateProfile(user, {
      displayName: name,
    })

    // Send email verification
    await sendEmailVerification(user)

    // Store additional user data in Firestore if available
    if (db) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        emailVerified: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        role: "user",
      })
    }

    return user
  } catch (error) {
    console.error("Error signing up:", error)
    throw error
  }
}

export async function signIn(email: string, password: string): Promise<User> {
  const auth = await getAuth()

  if (!auth) {
    throw new Error("Authentication not initialized")
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error("Error signing in:", error)
    throw error
  }
}

export async function signInWithGoogle(): Promise<User> {
  const auth = await getAuth()
  const db = await getFirestore()

  if (!auth) {
    throw new Error("Authentication not initialized")
  }

  try {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    const user = userCredential.user

    // Check if user exists in Firestore, if not create a new record
    if (db) {
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      )
    }

    return user
  } catch (error) {
    console.error("Error signing in with Google:", error)
    throw error
  }
}

export async function resetPassword(email: string): Promise<void> {
  const auth = await getAuth()

  if (!auth) {
    throw new Error("Authentication not initialized")
  }

  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    console.error("Error resetting password:", error)
    throw error
  }
}

export async function resendVerificationEmail(user: User): Promise<void> {
  try {
    await sendEmailVerification(user)
  } catch (error) {
    console.error("Error sending verification email:", error)
    throw error
  }
}
