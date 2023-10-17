import { atom } from 'recoil'

const authStateAtom = atom({
  key: 'authStateAtom',
  default: false,
})

export default authStateAtom
