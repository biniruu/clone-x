'use client'

import { useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'
import { useRecoilValue } from 'recoil'

import Navigation from '../components/Navigation'

import authStateAtom from 'recoil/authState'

// TODO: 로그인 한 이후에는 새로고침하더라도 로그인 상태를 유지하도록 구현
export default function Home() {
  const router = useRouter()

  const authState = useRecoilValue(authStateAtom)

  // TODO: 메인 화면이 뜨기 전에 redirection 할 수 있는 방법 적용
  useLayoutEffect(() => {
    !authState && router.push('/auth')
  }, [])

  return (
    <>
      <aside>
        <Navigation />
      </aside>
      <main>This is the main page.</main>
    </>
  )
}
