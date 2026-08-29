import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('formarium-theme')
    const nextTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark'
    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem('formarium-theme', nextTheme)
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="wordmark" to="/">
          FORMARIUM
        </Link>
        <nav aria-label="Primary navigation">
          <Link to="/" activeOptions={{ exact: true }}>
            Library
          </Link>
          <Link to="/catalog" search={{ q: '', runtime: 'all' }}>Catalog</Link>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'light'}
            onClick={toggleTheme}
          >
            <span className="theme-toggle__mark" aria-hidden="true">
              <span className="theme-toggle__halo" />
              <span className="theme-toggle__orbit" />
              <span className="theme-toggle__body" />
            </span>
          </button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
