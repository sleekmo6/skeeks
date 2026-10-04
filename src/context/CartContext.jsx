import { createContext, useContext, useEffect, useState } from 'react'

const CartCtx = createContext()
export const useCart = () => useContext(CartCtx)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart')) || [] } catch { return [] }
  })

  useEffect(() => {
    try { localStorage.setItem('cart', JSON.stringify(items)) } catch {}
  }, [items])

  const add = (product, size, qty = 1) =>
    setItems((prev) => {
      const key = `${product.id}-${size}`
      return prev.find((i) => i.key === key)
        ? prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { key, id: product.id, size, qty }]
    })

  const setQty = (key, qty) =>
    setItems((prev) => (qty < 1 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty } : i))))

  const remove = (key) => setItems((prev) => prev.filter((i) => i.key !== key))
  const count = items.reduce((n, i) => n + i.qty, 0)

  return <CartCtx.Provider value={{ items, add, setQty, remove, count }}>{children}</CartCtx.Provider>
}
