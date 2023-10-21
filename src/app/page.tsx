'use client'

import { useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'

import Navigation from '../components/Navigation'

export default function Home() {
  const router = useRouter()

  // TODO: 메인 화면이 뜨기 전에 redirection 할 수 있는 방법 적용
  useLayoutEffect(() => {
    const hasUser = localStorage.getItem('user')
    !hasUser && router.push('/auth')
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
