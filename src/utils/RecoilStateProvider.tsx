'use client'

import { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

function RecoilStateProvider({ children }: { children: ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>
}

export default RecoilStateProvider
