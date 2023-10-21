'use client'

import { AuthError, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useRef, type FormEvent } from 'react'

import AuthForm from 'components/AuthForm'
import { GoogleAuth } from 'utils/authWithSocialAccounts'
import { auth } from 'utils/firebaseSDK'

const providers = {
  google: GoogleAuth,
}

interface CreateUser {
  email: string
  password: string
}

// TODO: 로그인과 회원가입을 분리
function Auth() {
  const router = useRouter()

  const formRef = useRef<HTMLFormElement>(null)

  const resetForm = () => formRef.current?.reset()

  // TODO: 보안 문제를 일으킬 수 있는 부분 개선
  const setUserId = (uid: string) => localStorage.setItem('user', uid)

  const createUser = async ({ email, password }: CreateUser) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      setUserId(userCredential.user.uid)
      resetForm()
      router.push('/')
    } catch (error) {
      const err = error as AuthError
      console.error(err.code)
    }
  }

  const authWithProvider = async (name: string) => {
    const provider = providers[name as keyof typeof providers]

    try {
      const userCredential = await signInWithPopup(auth, provider)
      setUserId(userCredential.user.uid)
      resetForm()
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
      <AuthForm createUser={createUser} formRef={formRef} />
      <button name="google" onClick={signInWithSocialAccount} className="text-white capitalize">
        google sign in
      </button>
    </main>
  )
}

export default Auth
