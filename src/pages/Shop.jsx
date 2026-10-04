import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'

const tabs = ['All', ...categories]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [sort, setSort] = useState('featured')
  const category = params.get('category') || 'All'

  let list = category === 'All' ? [...products] : products.filter((p) => p.category === category)
  if (sort === 'low') list.sort((a, b) => a.price - b.price)
  if (sort === 'high') list.sort((a, b) => b.price - a.price)

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
      <p className="eyebrow">The collection</p>
      <h1 className="mt-2 font-display text-5xl">{category === 'All' ? 'Shop all' : category}</h1>

      <div className="mt-10 flex flex-col gap-4 border-y border-white/15 py-4 md:flex-row md:items-center md:justify-between">
        <div className="glass flex max-w-full gap-1 overflow-x-auto rounded-full p-1">
          {tabs.map((t) => (
            <button key={t} onClick={() => setParams(t === 'All' ? {} : { category: t })}
              className={`pill shrink-0 whitespace-nowrap ${category === t ? 'pill-active' : ''}`}>
              {t}
            </button>
          ))}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          className="glass rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] outline-none [&>option]:bg-panel [&>option]:text-fg">
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {list.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      {list.length === 0 && <p className="mt-10 text-muted">Nothing in {category} yet. New pieces are on the way.</p>}
    </div>
  )
}