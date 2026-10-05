import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProduct, img, money } from '../data/products'

export default function Cart() {
  const { items, setQty, remove } = useCart()
  const lines = items.map((i) => ({ ...i, product: getProduct(i.id) })).filter((l) => l.product)
  const subtotal = lines.reduce((n, l) => n + l.product.price * l.qty, 0)
  const shipping = subtotal === 0 || subtotal >= 150 ? 0 : 9
  const total = subtotal + shipping

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
      <h1 className="text-5xl">Your cart</h1>

      {lines.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-stone">Your cart is empty.</p>
          <Link to="/shop" className="btn mt-8">Continue shopping</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <ul className="divide-y divide-white/15 border-y border-white/15">
            {lines.map(({ key, product, size, qty }) => (
              <li key={key} className="flex gap-5 py-6">
                <Link to={`/product/${product.id}`} className="h-32 w-24 shrink-0 overflow-hidden bg-white/5">
                  <img src={img(product.images[0], 300)} alt={product.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-display font-medium">{product.name}</h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.15em] text-stone">Size {size}</p>
                    </div>
                    <p>{money(product.price * qty)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-white/15">
                      <button onClick={() => setQty(key, qty - 1)} className="px-3 py-1 hover:bg-white/10">−</button>
                      <span className="w-8 text-center text-sm">{qty}</span>
                      <button onClick={() => setQty(key, qty + 1)} className="px-3 py-1 hover:bg-white/10">+</button>
                    </div>
                    <button onClick={() => remove(key)} className="text-xs uppercase tracking-[0.2em] text-stone hover:text-fg">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="glass-panel h-fit rounded-3xl p-8">
            <h2 className="eyebrow">Order summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
              <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping ? money(shipping) : 'Free'}</dd></div>
              <div className="flex justify-between border-t border-white/15 pt-4 text-base font-medium"><dt>Total</dt><dd>{money(total)}</dd></div>
            </dl>
            <button className="btn mt-8 w-full">Checkout</button>
            <Link to="/shop" className="mt-4 block text-center text-xs uppercase tracking-[0.2em] text-stone hover:text-fg">Continue shopping</Link>
          </aside>
        </div>
      )}
    </div>
  )
}