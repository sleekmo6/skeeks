export default function Footer() {
  return (
    <footer className="bg-ink text-sand">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-12 md:flex-row md:px-8">
        <span className="font-display text-lg tracking-[0.3em]">SKEEKS</span>
        <p className="text-xs uppercase tracking-[0.2em] text-beige">© {new Date().getFullYear()} All rights reserved</p>
      </div>
    </footer>
  )
}
