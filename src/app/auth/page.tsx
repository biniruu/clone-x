'use client'

import { AuthError, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

import AuthForm from 'components/AuthForm'
import { GoogleAuth } from 'utils/authWithSocialAccounts'
import { auth } from 'utils/firebaseSDK'

const providers = {
  google: GoogleAuth,
}

function Auth() {
  const router = useRouter()

  const authWithProvider = async (name: string) => {
    const provider = providers[name as keyof typeof providers]

    try {
      await signInWithPopup(auth, provider)
      router.push('/')
    } catch (error) {
      const err = error as AuthError
      console.error(err.code)
    }
  }

  const signInWithSocialAccount = (e: FormEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    const name = target.name
    void authWithProvider(name)
  }

  return (
    <main className="flex flex-col">
      <AuthForm />
      <button name="google" onClick={signInWithSocialAccount} className="text-white capitalize">
        google sign in
      </button>
    </main>
  )
}

export default Auth
