import { Link } from 'react-router-dom'
import { img, money } from '../data/products'

export default function ProductCard({ product }) {
  const [main, alt] = product.images
  return (
    <Link to={`/product/${product.id}`} className="glass-panel group block rounded-3xl p-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5">
        <img src={img(main, 700)} alt={product.name} loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:opacity-0" />
        <img src={img(alt, 700)} alt="" loading="lazy"
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100" />
        {product.tag && (
          <span className="glass-strong absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-fg">{product.tag}</span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 px-1 pb-1">
        <div>
          <h3 className="text-sm font-medium">{product.name}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-stone">{product.category}</p>
        </div>
        <p className="text-sm">{money(product.price)}</p>
      </div>
    </Link>
  )
}