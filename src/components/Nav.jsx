// src/components/Nav.jsx
import { useEffect, useMemo, useState } from 'react'
import { useScrolledNav } from '../hooks/useScrolledNav'

const navLinks = [
  { href: '#concept', label: 'コンセプト' },
  { href: '#treatment', label: 'メニュー' },
  { href: '#flow', label: 'はじめての方へ' },
  { href: '#access', label: 'アクセス' },
]

function useActiveSection(hrefs = []) {
  const [active, setActive] = useState(hrefs[0] ?? '#hero')

  useEffect(() => {
    const ids = hrefs.map((h) => h.replace('#', '')).filter(Boolean)
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!nodes.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]

        if (visible?.target?.id) setActive(`#${visible.target.id}`)
      },
      {
        threshold: [0.15, 0.25, 0.35, 0.5],
        rootMargin: '-12% 0px -58% 0px',
      }
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [hrefs])

  return active
}

export default function Nav() {
  const isScrolled = useScrolledNav(60)
  const [open, setOpen] = useState(false)

  const hrefList = useMemo(() => ['#hero', ...navLinks.map((l) => l.href)], [])
  const active = useActiveSection(hrefList)

  // ESCで閉じる
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // 開いてる間の背面スクロール抑制（SP想定）
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const navBase =
    'fixed inset-x-0 top-0 z-[500] flex items-center justify-between border-b border-transparent px-side transition-all duration-500 ease-quiet'

  const navScrolled =
    'border-border/55 py-[16px] backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]'

  const navTop = 'py-[28px]'

  const navStyle = isScrolled
    ? {
        background: 'rgba(250,247,242,0.82)',
        boxShadow:
          '0 1px 0 rgba(216,209,196,0.25), 0 4px 20px rgba(30,22,12,0.05)',
      }
    : undefined

  const brandMain = [
    'font-en text-[1rem] font-light tracking-[0.22em] transition-colors duration-500',
    isScrolled ? 'text-text' : 'text-whiteish/95',
  ].join(' ')

  const brandSub = [
    'font-ja text-[0.58rem] font-light tracking-[0.28em] transition-colors duration-500',
    isScrolled ? 'text-text-lt' : 'text-[rgba(210,195,168,0.72)]',
  ].join(' ')

  const linkBase =
    'relative font-ja text-[0.72rem] font-light tracking-[0.18em] transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'

  const linkColor = isScrolled
    ? 'text-text-mid hover:text-text'
    : 'text-whiteish/75 hover:text-whiteish'

  const activeLine =
    "after:content-[''] after:absolute after:left-1/2 after:-bottom-[10px] after:h-[1px] after:w-[34px] after:-translate-x-1/2 after:bg-gold/70 after:opacity-0 after:transition-opacity after:duration-300"

  const activeOn = 'after:opacity-100'

  return (
    <>
      <nav
        className={[navBase, isScrolled ? navScrolled : navTop].join(' ')}
        style={navStyle}
        aria-label="Primary"
      >
        {/* Brand */}
        <a
          href="#hero"
          className="group flex items-center gap-4 no-underline focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-label="トップへ"
          onClick={() => setOpen(false)}
        >
          {/* Text block */}
          <span className="flex flex-col gap-[3px]">
            <span className={brandMain}>NAGI</span>
            <span className={brandSub}>タイ古式マッサージ</span>
          </span>

          {/* Palm（ちゃんと見える／スクロール後も“薄く残す”） */}
 <img
  src="/images/palm-cutout.png"
  alt=""
  aria-hidden="true"
  draggable={false}
  decoding="async"
  className={[
    'pointer-events-none select-none',
    'h-[34px] w-auto',
    'transition-all duration-500 ease-quiet',
    isScrolled
      ? 'opacity-0 -translate-y-[2px] scale-[0.98]' // ✅ スクロールしたら消す
      : 'opacity-[0.42] translate-y-0 scale-100 group-hover:opacity-[0.52]', // ✅ 気配だけ
  ].join(' ')}
  style={{
    filter: isScrolled
      ? 'grayscale(1) saturate(0) contrast(1.02) brightness(1.02)'
      : [
          'saturate(1.18)',      // ✅ 上げすぎない
          'hue-rotate(-10deg)',  // ✅ くすみ寄り
          'brightness(1.02)',
          'contrast(1.04)',
          // drop-shadow は撤去（主張の元）
        ].join(' '),
  }}
/>
        </a>

        {/* Desktop links */}
        <ul className="hidden list-none items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    linkBase,
                    linkColor,
                    activeLine,
                    isActive ? activeOn : '',
                  ].join(' ')}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            type="button"
            className={[
              'lg:hidden inline-flex items-center justify-center',
              'h-[38px] w-[42px] rounded-full border transition-all duration-300',
              isScrolled
                ? 'border-gold/32 bg-gold/[0.05] hover:border-gold/55 hover:bg-gold/[0.10]'
                : 'border-whiteish/22 bg-whiteish/[0.04] hover:border-whiteish/42 hover:bg-whiteish/[0.08]',
            ].join(' ')}
            aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={[
                'block h-[1px] w-[16px] transition-all duration-300',
                isScrolled ? 'bg-text' : 'bg-whiteish/92',
                open ? 'translate-y-[3px] rotate-45' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-[1px] w-[16px] transition-all duration-300 mt-[6px]',
                isScrolled ? 'bg-text' : 'bg-whiteish/92',
                open ? '-translate-y-[3px] -rotate-45' : '',
              ].join(' ')}
            />
          </button>

<a
  href="#reserve"
  onClick={() => setOpen(false)}
  className={[
    'px-[22px] py-[9px] font-ja text-[0.68rem] font-light tracking-[0.2em]',
    'bg-transparent',
    'transition-[color,background-color,box-shadow] duration-300 ease-quiet',
    'focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',

    // ✅ 線は border じゃなく shadow で描く（バグ枠感が消える）
    isScrolled
      ? [
          'text-text',
          'bg-whiteish/[0.56]', // 中身を少し白く
          'backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)]',
          'shadow-[inset_0_0_0_1px_rgba(176,144,96,0.16)]',
          'hover:bg-whiteish/[0.70]',
          'hover:shadow-[inset_0_0_0_1px_rgba(176,144,96,0.26)]',
        ].join(' ')
      : [
          'text-whiteish/92',
          'bg-whiteish/[0.05]', // 中身を少し白く（Hero上）
          'backdrop-blur-[8px] [-webkit-backdrop-filter:blur(8px)]',
          'shadow-[inset_0_0_0_1px_rgba(255,252,245,0.14)]',
          'hover:bg-whiteish/[0.08]',
          'hover:shadow-[inset_0_0_0_1px_rgba(255,252,245,0.24)]',
        ].join(' '),
  ].join(' ')}
>
  ご予約
</a>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className={[
          'fixed inset-0 z-[600] lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className={[
            'absolute inset-0 transition-opacity duration-400 ease-quiet',
            open ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          style={{
            background: open ? 'rgba(18, 14, 10, 0.42)' : 'transparent',
          }}
          onClick={() => setOpen(false)}
        />

        {/* Sheet */}
        <div
          className={[
            'absolute inset-x-0 top-0',
            'border-b border-border/55',
            'backdrop-blur-[14px] [-webkit-backdrop-filter:blur(14px)]',
            'transition-transform duration-500 ease-quiet',
            open ? 'translate-y-0' : '-translate-y-full',
          ].join(' ')}
          style={{
            background: 'rgba(250,247,242,0.92)',
            boxShadow: '0 10px 30px rgba(30,22,12,0.08)',
          }}
        >
          <div className="px-side pb-6 pt-[84px]">
            <ul className="m-0 grid list-none gap-4 p-0">
              {navLinks.map((link) => {
                const isActive = active === link.href
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'block py-3 font-ja text-[0.86rem] font-light tracking-[0.16em] no-underline',
                        'transition-colors duration-300',
                        isActive
                          ? 'text-text'
                          : 'text-text/70 hover:text-text',
                      ].join(' ')}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                    <div className="h-px w-full bg-border/45" />
                  </li>
                )
              })}
            </ul>

            <p className="mt-5 font-ja text-[0.68rem] font-light tracking-[0.14em] text-text/55">
              静かに整えるための道順
            </p>
          </div>
        </div>
      </div>
    </>
  )
}