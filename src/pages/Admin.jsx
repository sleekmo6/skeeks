import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const empty = {
  name: '',
  category: 'Hoodies',
  price: '',
  sale_price: '',
  tag: '',
  description: '',
  images: '',
  sizes: 'XS, S, M, L, XL',
}

export default function Admin() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  const [form, setForm] = useState(empty)
  const [file, setFile] = useState(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (loading) return
    if (!supabase || !user) navigate('/account')
  }, [loading, user, navigate])

  async function load() {
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false })
    if (error) setError(error.message)
    else setRows(data || [])
  }

  useEffect(() => {
    if (supabase && user) load()
  }, [user])

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((row) => `${row.name} ${row.category}`.toLowerCase().includes(q))
  }, [rows, query])

  function set(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function startNew() {
    setForm(empty)
    setFile(null)
    setError('')
    setOpen(true)
  }

  function startEdit(row) {
    setForm(row)
    setFile(null)
    setError('')
    setOpen(true)
  }

  async function save(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    let imageUrl = form.images || ''

    if (file) {
      const path = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
      const { error: uploadError } = await supabase.storage.from('products').upload(path, file)
      if (uploadError) {
        setError(uploadError.message)
        setSaving(false)
        return
      }
      imageUrl = supabase.storage.from('products').getPublicUrl(path).data.publicUrl
    }

    const payload = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      sale_price: form.sale_price === '' || form.sale_price == null ? null : Number(form.sale_price),
      tag: form.tag || null,
      description: form.description,
      images: imageUrl,
      sizes: form.sizes,
    }

    const query = form.id
      ? supabase.from('products').update(payload).eq('id', form.id)
      : supabase.from('products').insert(payload)
    const { error: saveError } = await query
    setSaving(false)
    if (saveError) {
      setError(saveError.message)
      return
    }
    setOpen(false)
    setForm(empty)
    setFile(null)
    load()
  }

  if (loading || !user) return null

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-[#1f2933]">
      <div className="grid min-h-screen md:grid-cols-[240px_1fr]">
        <aside className="border-r border-black/5 bg-[#f7f7f8] px-4 py-6">
          <p className="px-3 text-xs font-medium uppercase tracking-[0.16em] text-black/40">Catalog</p>
          <div className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-medium shadow-sm">Products</div>
        </aside>

        <main className="px-5 py-8 md:px-10">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
            <button onClick={startNew} className="rounded-xl bg-black px-4 py-2 text-sm text-white">
              + Add product
            </button>
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product name"
            className="mt-6 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none"
          />

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <div className="mt-4 overflow-hidden rounded-2xl border border-black/5 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-black/5 text-black/50">
                <tr>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((row) => (
                  <tr key={row.id} className="border-b border-black/5 last:border-0">
                    <td className="px-4 py-3">
                      <button onClick={() => startEdit(row)} className="flex items-center gap-3 text-left">
                        {row.images ? (
                          <img src={row.images} alt="" className="h-12 w-12 rounded-lg object-cover" />
                        ) : (
                          <span className="h-12 w-12 rounded-lg bg-black/5" />
                        )}
                        <span className="font-medium">{row.name}</span>
                      </button>
                    </td>
                    <td className="px-4 py-3">${Number(row.price).toFixed(2)}</td>
                    <td className="px-4 py-3">{row.category}</td>
                  </tr>
                ))}
                {shown.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-4 py-10 text-center text-black/40">No products yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {open && (
            <form onSubmit={save} className="mt-6 grid gap-3 rounded-2xl border border-black/5 bg-white p-5">
              <h2 className="text-lg font-medium">{form.id ? 'Edit product' : 'Add product'}</h2>
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              {['name', 'category', 'price', 'sale_price', 'sizes', 'description'].map((key) => (
                <input
                  key={key}
                  required={key === 'name' || key === 'price'}
                  placeholder={key.replace('_', ' ')}
                  value={form[key] ?? ''}
                  onChange={(e) => set(key, e.target.value)}
                  className="rounded-xl border border-black/10 px-4 py-3"
                />
              ))}
              <div className="flex gap-3">
                <button disabled={saving} className="rounded-xl bg-black px-4 py-2 text-sm text-white">
                  {saving ? 'Saving' : 'Save'}
                </button>
                <button type="button" onClick={() => setOpen(false)} className="rounded-xl px-4 py-2 text-sm">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  )
}