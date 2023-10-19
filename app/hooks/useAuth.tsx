"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth'
import { redirect, useRouter } from "next/navigation"
import { auth } from "@/firebaseConfig"

type AuthType = {
  user: User | null,
  signUp: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
  redirectToLogin: () => void
}

const AuthContext = createContext<AuthType>({
  user: null,
  signUp: async () => {},
  login: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
  redirectToLogin: () => {}
})

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User| null>(null)
  const [error, setError] = useState(null)
  const [firstLoading, setFirstLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("in first useEf")
      console.log(user)
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
        // currently not working due to a bug
        // redirect('/login')
        // router.push('/login')
      }
    })
    setFirstLoading(false)
  }, [auth])

  const redirectToLogin = () => {
    if (user === null) {
      router.push('/login')
    }
  }
  
  const signUp = async (email: string, password: string) => {
    setLoading(true)
       
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      // userCredential.user returns a firebase user
      setUser(userCredential.user)
      setLoading(false)
      router.push('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.warn(errorCode)
      console.warn(errorMessage)
      alert(errorMessage)
    })
    .finally(() => setLoading(false))
  }

  const login = async (email: string, password: string) => {
    setLoading(true)

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      // userCredential.user returns a firebase user
      setUser(userCredential.user)
      setLoading(false)
      router.push('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.warn(errorCode)
      console.warn(errorMessage)
      alert(errorMessage)
    })
    .finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)
    signOut(auth).then(() => {
      setUser(null)
    })    
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.warn(errorCode)
      console.warn(errorMessage)
      alert(errorMessage)
    })
    .finally(() => setLoading(false))
  }

  const memoValue = {
    loading,
    user,
    error,
    signUp,
    login,
    logout,
    redirectToLogin
  }

  return (
    <AuthContext.Provider value={memoValue}>
      { !firstLoading && children }
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}