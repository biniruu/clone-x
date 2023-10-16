import Link from 'next/link'

function Navigation() {
  return (
    <nav role="list">
      <div role="listitem">
        <Link href="/">홈</Link>
      </div>
    </nav>
  )
}

export default Navigation
