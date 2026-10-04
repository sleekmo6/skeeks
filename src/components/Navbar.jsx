import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/shop', label: 'Shop All' },
  { to: '/shop?category=Clothing', label: 'Clothing' },
  { to: '/shop?category=Sneakers', label: 'Sneakers' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-beige/60 bg-sand/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className="block h-px w-6 bg-ink" />
          <span className="mt-2 block h-px w-6 bg-ink" />
        </button>

        <nav className="hidden gap-10 md:flex">
          {links.map((l) => (
            <NavLink key={l.label} to={l.to} className="text-xs uppercase tracking-[0.2em] transition hover:text-stone">
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/" className="font-display text-xl tracking-[0.3em] md:absolute md:left-1/2 md:-translate-x-1/2">
          SKEEKS
        </Link>

        <Link to="/cart" className="text-xs uppercase tracking-[0.2em] transition hover:text-stone">
          Cart ({count})
        </Link>
      </div>

      {open && (
        <nav className="flex flex-col gap-5 border-t border-beige/60 px-5 py-6 md:hidden">
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
