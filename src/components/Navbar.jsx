import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { categories, catLink } from '../data/products'

const links = [
  { to: '/shop', label: 'Shop All' },
  ...categories.map((c) => ({ to: catLink(c), label: c })),
]

/* Portrait button: goes to /account when signed out, opens a small sheet with the email when signed in. */
function PortraitMenu() {
  const { user, signOut } = useAuth()
  const { pathname, search } = useLocation()
  const [open, setOpen] = useState(false)
  const box = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const cls = 'pill-solid !w-10 justify-center !px-0'
  const icon = (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.9 3.1-6 7-6s7 2.1 7 6" />
    </svg>
  )

  if (!user) {
    return <Link to="/account" state={{ from: pathname + search }} aria-label="Log in or sign up" className={cls}>{icon}</Link>
  }

  return (
    <div ref={box} className="relative">
      <button type="button" aria-label="Account" aria-expanded={open} onClick={() => setOpen(!open)} className={cls}>{icon}</button>
      {open && (
        <div className="glass-photo absolute right-0 top-12 z-30 w-64 rounded-2xl p-4 text-fg">
          <p className="text-xs text-muted">Signed in as</p>
          <p className="mt-1 truncate text-sm">{user.email}</p>
          <button type="button" className="btn mt-4 w-full !py-3"
            onClick={async () => { await signOut(); setOpen(false) }}>Log out</button>
        </div>
      )}
    </div>
  )
}

/* Top bar used inside the Home hero panel (dark pill style). */
export function HomeBar() {
  const { count } = useCart()

  return (
    <div className="flex flex-wrap items-center justify-between gap-y-5 px-6 pt-8 text-fg md:grid md:grid-cols-[1fr_auto_1fr] md:px-14 md:pt-10">
      <Link to="/" className="order-1 py-1 font-logo text-[3.2rem] font-normal leading-none tracking-[0.05em] text-[#c6a07a] md:text-[4.5rem] [text-shadow:0_10px_24px_rgba(0,0,0,0.45)]">Skeeks</Link>

      <nav className="order-3 flex w-full justify-between glass overflow-x-auto rounded-full p-1 md:order-2 md:w-auto md:justify-center">
        <Link to="/" className="pill pill-active">Home</Link>
        <Link to="/shop" className="pill">Shop</Link>
        <button type="button" className="pill shrink-0 whitespace-nowrap"
          onClick={() => document.getElementById('flash-sales')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Flash Sales</button>
        <Link to="/shop" className="pill shrink-0 whitespace-nowrap">New collection</Link>
        <button type="button" className="pill">Showcase</button>
      </nav>

      <div className="order-2 flex items-center gap-2 md:order-3 md:justify-self-end">
        <Link to="/cart" aria-label="Cart" className="pill-ghost relative !w-10 justify-center !px-0">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </svg>
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center glass rounded-full px-1 text-[10px] text-fg">{count}</span>
          )}
        </Link>
        <PortraitMenu />
      </div>
    </div>
  )
}

/* Global navbar for every page except Home (Home uses HomeBar). */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { count } = useCart()
  const { pathname } = useLocation()
  if (pathname === '/') return null

  return (
    <header className="glass sticky top-0 z-50">
      <div className="mx-auto flex min-h-[5rem] max-w-7xl items-center justify-between px-5 py-2 md:min-h-[6rem] md:px-8">
        <button className="ml-auto mr-5 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className="block h-px w-6 bg-fg" />
          <span className="mt-2 block h-px w-6 bg-fg" />
        </button>

        <nav className="hidden gap-6 lg:flex xl:gap-8">
          {links.map((l) => (
            <NavLink key={l.label} to={l.to} className="text-xs uppercase tracking-[0.2em] transition hover:text-stone">
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/" className="order-first py-1 font-logo text-[3.2rem] font-normal leading-none tracking-[0.05em] text-[#c6a07a] md:text-[4.5rem] [text-shadow:0_10px_24px_rgba(0,0,0,0.45)]">
          Skeeks
        </Link>

        <Link to="/cart" className="text-xs uppercase tracking-[0.2em] transition hover:text-stone">
          Cart ({count})
        </Link>
      </div>

      {open && (
        <nav className="flex flex-col gap-5 border-t border-white/15 px-5 py-6 lg:hidden">
          {links.map((l) => (
            <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="text-sm uppercase tracking-[0.2em]">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}