'use client'

import { RefObject, type SyntheticEvent } from 'react'

interface Props {
  createUser: (data: { email: string; password: string }) => Promise<void>
  formRef: RefObject<HTMLFormElement>
}

interface FormData {
  email: {
    value: string
  }
  password: {
    value: string
  }
}

function AuthForm({ createUser, formRef }: Props) {
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
