'use client'

import { SyntheticEvent } from 'react'

// eslint-disable-next-line @typescript-eslint/require-await
function AuthForm() {
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }
    const email = target.email.value
    const password = target.password.value
    console.log(email, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Email" name="email" className="text-black" />
      <input type="password" placeholder="Password" name="password" className="text-black" />
      <button type="submit" className="capitalize">
        sign in
      </button>
    </form>
  )
}

export default AuthForm
