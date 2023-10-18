'use client'

import { AuthError, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useRef } from 'react'
import { useSetRecoilState } from 'recoil'

import authStateAtom from 'recoil/authState'
import { auth } from 'utils/firebaseSDK'

interface CreateUser {
  email: string
  password: string
}

interface FormData {
  email: {
    value: string
  }
  password: {
    value: string
  }
}

function AuthForm() {
  const router = useRouter()

  const setAuthState = useSetRecoilState(authStateAtom)

  const formRef = useRef<HTMLFormElement>(null)

  const createUser = async ({ email, password }: CreateUser) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      formRef.current?.reset()
      setAuthState(true)
      router.push('/')
    } catch (error) {
      const err = error as AuthError
      console.error(err.code)
    }
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & FormData
    const email = target.email.value
    const password = target.password.value
    void createUser({ email, password })
  }

  return (
    <form ref={formRef} className="flex flex-col justify-start mb-4" onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" name="email" className="text-black mb-4" />
      <input type="password" placeholder="Password" name="password" className="text-black mb-4" />
      <button type="submit" className="capitalize">
        sign in
      </button>
    </form>
  )
}

export default AuthForm
