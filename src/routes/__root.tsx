import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
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
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
