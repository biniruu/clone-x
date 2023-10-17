'use client'

import { AuthError, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useRef } from 'react'

import { Auth } from 'utils/firebaseSDK'

interface CreateUser {
  email: string
  password: string
}

function AuthForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const createUser = async ({ email, password }: CreateUser) => {
    try {
      await createUserWithEmailAndPassword(Auth, email, password)
      formRef.current?.reset()
      router.push('/')
    } catch (error) {
      const err = error as AuthError
      console.error(err.code)
    }
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }
    const email = target.email.value
    const password = target.password.value
    void createUser({ email, password })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input type="text" placeholder="Email" name="email" className="text-black" />
      <input type="password" placeholder="Password" name="password" className="text-black" />
      <button type="submit" className="capitalize">
        sign in
      </button>
    </form>
  )
}

export default AuthForm
