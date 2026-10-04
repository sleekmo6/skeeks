import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const tabs = ['All', 'Clothing', 'Sneakers']

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

      <div className="mt-10 flex flex-col gap-4 border-y border-beige py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-6">
          {tabs.map((t) => (
            <button key={t} onClick={() => setParams(t === 'All' ? {} : { category: t })}
              className={`text-xs uppercase tracking-[0.2em] transition ${category === t ? 'border-b border-ink pb-1' : 'text-stone hover:text-ink'}`}>
              {t}
            </button>
          ))}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          className="bg-transparent text-xs uppercase tracking-[0.2em] outline-none">
          <option value="featured">Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {list.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
