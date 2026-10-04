import { Link } from 'react-router-dom'
import { img, money } from '../data/products'

export default function ProductCard({ product }) {
  const [main, alt] = product.images
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        <img src={img(main, 700)} alt={product.name} loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:opacity-0" />
        <img src={img(alt, 700)} alt="" loading="lazy"
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100" />
        {product.tag && (
          <span className="absolute left-3 top-3 bg-ink px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-sand">{product.tag}</span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium">{product.name}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-stone">{product.category}</p>
        </div>
        <p className="text-sm">{money(product.price)}</p>
      </div>
    </Link>
  )
}
