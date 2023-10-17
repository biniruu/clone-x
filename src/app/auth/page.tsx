import { AuthError, signInWithPopup } from 'firebase/auth'
import { FormEvent } from 'react'

import AuthForm from 'components/AuthForm'
import { GoogleAuth } from 'utils/authWithSocialAccounts'
import { auth } from 'utils/firebaseSDK'

const providers = {
  google: GoogleAuth,
}

function Auth() {
  const signInWithSocialAccount = async (e: FormEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    const provider = providers[target.name as keyof typeof providers]

    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      const err = error as AuthError
      console.error(err.code)
    }
  }

  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={signInWithSocialAccount}></button>
      </div>
    </div>
  )
}

export default Auth
