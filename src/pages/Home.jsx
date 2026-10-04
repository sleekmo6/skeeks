import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products, img } from '../data/products'

const categories = [
  { name: 'Clothing', image: 'photo-1434389677669-e08b4cac3105' },
  { name: 'Sneakers', image: 'photo-1542291026-7eec264c27ff' },
]

export default function Home() {
  const featured = products.filter((p) => p.tag).slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[88vh] min-h-[520px] items-end overflow-hidden bg-ink">
        <img src={img('photo-1515886657613-9f3515b0c78f', 1800)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 text-sand md:px-8 md:pb-24">
          <p className="eyebrow !text-beige">Autumn / Winter {new Date().getFullYear()}</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[1.05] md:text-7xl">
            Quiet luxury, <em className="font-normal">worn loud.</em>
          </h1>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/shop" className="btn !bg-sand !text-ink hover:!bg-beige">Shop the collection</Link>
            <Link to="/shop?category=Sneakers" className="btn-outline !border-sand !text-sand hover:!bg-sand hover:!text-ink">Sneakers</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <p className="eyebrow">Shop by category</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
          {categories.map((c) => (
            <Link key={c.name} to={`/shop?category=${c.name}`} className="group relative block aspect-[4/5] overflow-hidden bg-beige md:aspect-[5/6]">
              <img src={img(c.image, 1100)} alt={c.name} loading="lazy"
                className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-ink/20 transition group-hover:bg-ink/40" />
              <div className="absolute bottom-8 left-8 text-sand">
                <h2 className="font-display text-4xl">{c.name}</h2>
                <span className="mt-2 inline-block border-b border-sand pb-1 text-xs uppercase tracking-[0.2em] transition-all group-hover:pr-4">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow">Curated for you</p>
            <h2 className="mt-2 font-display text-4xl">Featured pieces</h2>
          </div>
          <Link to="/shop" className="hidden border-b border-ink pb-1 text-xs uppercase tracking-[0.2em] hover:text-stone md:block">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-ink py-20 text-center text-sand">
        <p className="eyebrow !text-beige">Free shipping over $150</p>
        <h2 className="mx-auto mt-4 max-w-xl px-5 font-display text-3xl md:text-4xl">Considered design. Made to be lived in.</h2>
      </section>
    </>
  )
}
