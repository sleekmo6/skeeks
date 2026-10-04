import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { categories, catLink } from '../data/products'

const links = [
  { to: '/shop', label: 'Shop All' },
  ...categories.map((c) => ({ to: catLink(c), label: c })),
]

/* Top bar used inside the Home hero panel (dark pill style). */
export function HomeBar() {
  const { count } = useCart()

  return (
    <div className="flex flex-wrap items-center justify-between gap-y-5 px-6 pt-6 text-fg md:grid md:grid-cols-[1fr_auto_1fr] md:px-14 md:pt-8">
      <Link to="/" className="order-1 font-display text-xl tracking-[0.3em]">SKEEKS</Link>

      <nav className="order-3 flex w-full justify-between glass overflow-x-auto rounded-full p-1 md:order-2 md:w-auto md:justify-center">
        <Link to="/" className="pill pill-active">Home</Link>
        <Link to="/shop" className="pill">Shop</Link>
        <button type="button" className="pill">Sale</button>
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
        <button type="button" aria-label="Account" className="pill-solid !w-10 justify-center !px-0">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.9 3.1-6 7-6s7 2.1 7 6" />
          </svg>
        </button>
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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
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

        <Link to="/" className="font-display text-xl tracking-[0.3em] lg:order-first">
          SKEEKS
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