import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HomeBar } from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import CategoryScroll from '../components/CategoryScroll'
import { products, img, money } from '../data/products'

// Arch heights: centre tallest, edges shortest
const heights = ['h-[82%]', 'h-[92%]', 'h-full', 'h-[92%]', 'h-[82%]']

export default function Home() {
  const [start, setStart] = useState(0)
  const n = products.length
  const looks = Array.from({ length: 5 }, (_, k) => products[(start + k) % n])
  const featured = products.filter((p) => p.tag).slice(0, 4)

  return (
    <div className="p-3 md:p-6">
      {/* Hero panel */}
      <section className="glass-panel overflow-hidden rounded-3xl">
        <HomeBar />

        <div className="mx-auto max-w-4xl px-6 pt-14 text-center md:pt-16">
          <span className="glass inline-block rounded-full px-5 py-2 text-sm text-muted">
            New autumn / winter collection
          </span>
          <h1 className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
            Quiet luxury,<br />worn loud.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted">
            Clothing and sneakers cut for everyday movement. Considered design, made to be lived in.
          </p>
        </div>

        {/* Arch lookbook */}
        <div className="relative mt-8 md:mt-10">
          <button type="button" aria-label="Previous" onClick={() => setStart((start - 1 + n) % n)} className="arrow-btn left-4 md:left-[17%]">←</button>
          <button type="button" aria-label="Next" onClick={() => setStart((start + 1) % n)} className="arrow-btn right-4 md:right-[17%]">→</button>

          <div className="-mx-[6%] flex h-[320px] items-end gap-3 md:h-[420px] md:gap-5">
            {looks.map((p, k) => (
              <Link key={p.id} to={`/product/${p.id}`} aria-label={p.name}
                className={`arch group ${heights[k]} ${k > 1 ? 'hidden md:block' : ''}`}>
                <img src={img(p.images[0], 600)} alt={p.name} loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                {k === 2 && (
                  <span className="absolute bottom-14 left-1/2 flex h-24 w-24 -translate-x-1/2 flex-col items-center justify-center rounded-full glass-strong text-center">
                    <span className="text-[11px] text-fg/80">Price</span>
                    <span className="text-lg font-medium">{money(p.price)}</span>
                  </span>
                )}
                <span className="absolute bottom-4 left-1/2 max-w-[85%] -translate-x-1/2 truncate rounded-full border border-white/30 bg-black/45 px-3 py-1 font-display text-xs text-fg backdrop-blur-md backdrop-brightness-[0.6] [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                  {p.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories: sticky scroll-driven panels */}
      <CategoryScroll />

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-2 pb-20 pt-16 md:px-5">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow !text-muted">Curated for you</p>
            <h2 className="mt-2 text-4xl">Featured pieces</h2>
          </div>
          <Link to="/shop" className="hidden border-b border-white pb-1 text-xs uppercase tracking-[0.2em] md:block">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}