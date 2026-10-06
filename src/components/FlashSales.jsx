import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { saleProducts } from '../data/sale'
import { img, money } from '../data/products'

// Fixed end time (not tied to the visitor), so it never resets
const END = new Date('2026-10-20T23:59:00+01:00').getTime()

function Countdown() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const left = END - now
  if (left <= 0) return <p className="glass rounded-full px-5 py-2 text-sm">Sale ended</p>

  const units = [
    ['Days', Math.floor(left / 86400000)],
    ['Hours', Math.floor((left % 86400000) / 3600000)],
    ['Minutes', Math.floor((left % 3600000) / 60000)],
  ]
  return (
    <div>
      <p className="eyebrow">Ends in</p>
      <div className="mt-2 flex gap-2">
        {units.map(([label, v]) => (
          <div key={label} className="glass flex min-w-[4.5rem] flex-col items-center rounded-2xl px-4 py-2">
            <span className="text-2xl tabular-nums">{label === 'Days' ? v : String(v).padStart(2, '0')}</span>
            <span className="text-[11px] uppercase tracking-[0.15em] text-muted">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const SPEED = 28 // px per second, slow drift to the left

export default function FlashSales() {
  const n = saleProducts.length
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const row = useRef(null)
  const suppress = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // Endless track: two identical sets back to back. The scroll position is kept inside one
  // set-width window, so whenever it leaves that window it jumps by exactly one set width.
  useEffect(() => {
    const el = row.current
    if (!el || reduced) return
    const s = { pos: 0, setW: 0, z: 0, down: false, lastUser: 0, written: 0, drag: null }

    const measure = () => {
      s.setW = el.children[n].offsetLeft - el.children[0].offsetLeft
      s.z = Math.round(s.setW * 0.25) // room to drag backwards before a wrap
    }
    const wrap = (v) => s.z + ((((v - s.z) % s.setW) + s.setW) % s.setW)
    const write = () => {
      s.pos = wrap(s.pos)
      el.scrollLeft = s.pos
      s.written = el.scrollLeft
    }

    measure()
    s.pos = s.z
    write()

    let raf = 0
    let last = performance.now()
    const tick = (t) => {
      const dt = Math.min(t - last, 64)
      last = t
      // paused while a finger/pointer is down, and until a swipe's momentum has settled
      if (!s.down && t - s.lastUser > 200) {
        s.pos += (SPEED * dt) / 1000
        write()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onScroll = () => {
      if (Math.abs(el.scrollLeft - s.written) <= 1) return // our own write
      s.lastUser = performance.now()
      s.pos = el.scrollLeft
      if (s.pos < s.z || s.pos >= s.z + s.setW) write()
    }
    const onDown = (e) => {
      s.down = true
      if (e.pointerType === 'mouse') s.drag = { x: e.clientX, p: s.pos, moved: false }
    }
    const onMove = (e) => {
      const d = s.drag
      if (!d) return
      const dx = e.clientX - d.x
      if (!d.moved && Math.abs(dx) > 5) {
        d.moved = true
        el.setPointerCapture?.(e.pointerId)
      }
      if (d.moved) {
        s.pos = d.p - dx
        s.lastUser = performance.now()
        write()
      }
    }
    const onUp = () => {
      if (s.drag?.moved) {
        suppress.current = true
        setTimeout(() => { suppress.current = false }, 60)
      }
      s.drag = null
      s.down = false
      s.lastUser = performance.now()
    }
    const onResize = () => {
      const offset = s.pos - s.z
      measure()
      s.pos = s.z + offset
      write()
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
      window.removeEventListener('resize', onResize)
    }
  }, [reduced, n])

  // Reduced motion: a single plain row, no auto-scroll
  const cards = reduced ? saleProducts : [...saleProducts, ...saleProducts]

  return (
    <section id="flash-sales" className="mx-auto max-w-7xl scroll-mt-6 px-2 pt-16 md:px-5">
      <p className="eyebrow">Limited time</p>
      <h2 className="mt-2 text-4xl">Flash Sales</h2>
      <div className="mt-6"><Countdown /></div>

      <div
        ref={row}
        onClickCapture={(e) => { if (suppress.current) { e.preventDefault(); e.stopPropagation() } }}
        className="mt-8 flex cursor-grab touch-pan-x select-none gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cards.map((p, i) => {
          const copy = i >= n // the second set is a visual duplicate only
          return (
            <Link key={`${p.id}-${copy ? 'b' : 'a'}`} to={`/product/${p.id}`} draggable={false}
              aria-hidden={copy || undefined} tabIndex={copy ? -1 : undefined}
              className="glass-panel group block w-[calc((100%-1rem)/1.5)] shrink-0 rounded-3xl p-3 md:w-[calc((100%-3rem)/4)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5">
                <img src={img(p.images[0], 700)} alt={copy ? '' : p.name} loading="lazy" draggable={false}
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-4 px-1 pb-1">
                <h3 className="font-display text-sm font-medium">{p.name}</h3>
                <p className="mt-1 flex items-baseline gap-2 text-sm">
                  <span className="text-muted line-through">{money(p.oldPrice)}</span>
                  <span>{money(p.price)}</span>
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}