import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, catLink, img } from '../data/products'

const PHOTO = {
  Hoodies: '1556821840-3a63f95609a7',
  Shirts: '1521572163474-6864f9cf17ab',
  Pants: '1542272604-787c3835535d',
  'Caps and headgear': '1588850561407-ed78c282e89b',
  Sneakers: '1542291026-7eec264c27ff',
}
const SLIDE = 90 // slide width, % of the panel
const STEP = 92 // spacing between slides, so the next one peeks 8% from the right
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const chipFilter = 'blur(28px) saturate(180%) brightness(0.7)'

function Photo({ name }) {
  return (
    <img src={img(`photo-${PHOTO[name]}`, 1600)} alt={name} draggable={false}
      onError={(e) => { e.currentTarget.style.display = 'none' }}
      className="absolute inset-0 h-full w-full object-cover object-center" />
  )
}

function Chip({ name }) {
  return (
    <span
      className="glass absolute bottom-5 left-5 rounded-full px-4 py-2 text-sm text-fg"
      style={{ background: 'rgba(0,0,0,0.45)', WebkitBackdropFilter: chipFilter, backdropFilter: chipFilter }}>
      {name}
    </span>
  )
}

export default function CategoryScroll() {
  const n = categories.length
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [vh, setVh] = useState(() => window.innerHeight)
  const [idx, setIdx] = useState(0)
  const track = useRef(null)
  const slides = useRef([])
  const bar = useRef(null)
  const prog = useRef(0)
  const drag = useRef(null)
  const suppress = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // Scroll progress through the track -> category index (one per viewport height)
  useEffect(() => {
    if (reduced) return
    let raf = 0
    const update = () => {
      raf = 0
      if (!track.current) return
      const p = clamp(-track.current.getBoundingClientRect().top / window.innerHeight, 0, n - 1)
      prog.current = p
      slides.current.forEach((el, i) => {
        if (el) el.style.transform = `translateX(${(i - p) * (STEP / SLIDE) * 100}%)`
      })
      if (bar.current) bar.current.style.transform = `scaleX(${p / (n - 1)})`
      setIdx(Math.round(p))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    const onResize = () => { setVh(window.innerHeight); onScroll() }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [reduced, n])

  // Horizontal drag seeks the same index by scrolling the page (the track), not by translating a row
  const down = (e) => {
    drag.current = { x: e.clientX, y0: window.scrollY, w: e.currentTarget.getBoundingClientRect().width, moved: false }
  }
  const move = (e) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true
      e.currentTarget.setPointerCapture?.(e.pointerId)
    }
    if (d.moved) window.scrollTo(0, d.y0 - dx * (window.innerHeight / d.w))
  }
  const up = () => {
    const d = drag.current
    drag.current = null
    if (!d?.moved) return
    suppress.current = true
    setTimeout(() => { suppress.current = false }, 60)
    const top = track.current.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + Math.round(prog.current) * window.innerHeight, behavior: 'smooth' })
  }
  const clickCapture = (e) => {
    if (suppress.current) { e.preventDefault(); e.stopPropagation() }
  }

  // Reduced motion: no sticky track, just five stacked panels
  if (reduced) {
    return (
      <section aria-label="Shop by category" className="mx-auto flex max-w-7xl flex-col gap-4 px-2 pt-16 md:px-5">
        {categories.map((c) => (
          <Link key={c} to={catLink(c)} draggable={false}
            className="relative block h-[70vh] overflow-hidden rounded-3xl border border-white/15 bg-white/5 md:h-[78vh]">
            <Photo name={c} />
            <Chip name={c} />
          </Link>
        ))}
      </section>
    )
  }

  return (
    <section ref={track} aria-label="Shop by category" style={{ height: n * vh }} className="mx-auto mt-16 max-w-7xl px-2 md:px-5">
      <div
        className="sticky top-0 flex touch-pan-y select-none flex-col justify-center"
        style={{ height: vh }}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onClickCapture={clickCapture}>
        <div className="mb-4 flex items-center gap-4">
          <span className="eyebrow whitespace-nowrap">
            {String(idx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} · {categories[idx]}
          </span>
          <span className="relative h-px flex-1 bg-white/15">
            <span ref={bar} className="absolute inset-0 origin-left bg-fg" style={{ transform: 'scaleX(0)' }} />
          </span>
        </div>
        <div className="relative h-[70vh] overflow-hidden md:h-[78vh]">
          {categories.map((c, i) => (
            <Link key={c} to={catLink(c)} draggable={false} ref={(el) => { slides.current[i] = el }}
              className="absolute block bottom-0 left-0 top-0 overflow-hidden rounded-3xl border border-white/15 bg-white/5 will-change-transform"
              style={{ width: `${SLIDE}%`, transform: `translateX(${i * (STEP / SLIDE) * 100}%)` }}>
              <Photo name={c} />
              <Chip name={c} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}