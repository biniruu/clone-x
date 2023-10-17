'use client'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { SyntheticEvent, useRef } from 'react'

import { Auth } from 'utils/firebaseSDK'

interface CreateWithUser {
  email: string
  password: string
}

// eslint-disable-next-line @typescript-eslint/require-await
function AuthForm() {
  const formRef = useRef<HTMLFormElement>(null)

  const createUser = async ({ email, password }: CreateWithUser) => {
    try {
      await createUserWithEmailAndPassword(Auth, email, password)
      formRef.current?.reset()
    } catch (error) {
      const err = error as Error
      console.error(err)
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
