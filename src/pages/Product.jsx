import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProduct, img, money } from '../data/products'
import { getSaleProduct } from '../data/sale'
import { useCart } from '../context/CartContext'

export default function Product() {
  const { id } = useParams()
  const product = getProduct(id) || getSaleProduct(id)
  const { add } = useCart()
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const [size, setSize] = useState(null)
  const [error, setError] = useState(false)
  const [added, setAdded] = useState(false)

  if (!product) return <div className="py-32 text-center">Product not found. <Link to="/shop" className="underline">Back to shop</Link></div>

  const handleAdd = () => {
    if (!size) return setError(true)
    add(product, size)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <button onClick={() => navigate(-1)} className="pill-ghost mb-8">← Back</button>

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        {/* Gallery */}
        <div className="glass-photo flex h-fit flex-col-reverse gap-4 rounded-3xl p-4 md:flex-row">
          <div className="flex gap-3 md:flex-col">
            {product.images.map((src, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-white/5 transition md:h-24 md:w-20 ${active === i ? 'ring-1 ring-white' : 'opacity-60 hover:opacity-100'}`}>
                <img src={img(src, 200)} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="aspect-[4/5] flex-1 overflow-hidden rounded-2xl bg-white/5">
            <img src={img(product.images[active], 1200)} alt={product.name}
              className="h-full w-full object-cover transition duration-700 hover:scale-105" />
          </div>
        </div>

        {/* Details */}
        <div className="glass-panel h-fit rounded-3xl p-6 md:p-8">
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl text-fg md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-2xl text-muted">
            {money(product.price)}
            {product.oldPrice && <span className="ml-3 text-base line-through opacity-70">{money(product.oldPrice)}</span>}
          </p>
          <p className="mt-6 leading-relaxed text-muted">{product.description}</p>

          <div className="mt-10">
            <div className="flex justify-between text-xs uppercase tracking-[0.2em]">
              <span>Select size</span>
              {error && <span className="text-red-400">Please choose a size</span>}
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-6">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => { setSize(s); setError(false) }}
                  className={`rounded-full py-3 text-sm transition ${size === s ? 'border border-fg bg-fg text-panel' : 'glass text-fg'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleAdd} className="btn mt-8 w-full">{added ? 'Added ✓' : 'Add to cart'}</button>
          {added && <Link to="/cart" className="btn-outline mt-3 w-full">View cart</Link>}

          <ul className="mt-10 space-y-2 border-t border-white/15 pt-6 text-sm text-stone">
            <li>Free shipping on orders over $150</li>
            <li>30-day returns</li>
          </ul>
        </div>
      </div>
    </div>
  )
}