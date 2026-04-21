// src/components/sp/NavSP.jsx
import { useEffect, useMemo, useState } from 'react'
import { useScrolledNav } from '../../hooks/useScrolledNav'

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
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
        if (top?.target?.id) setActive(`#${top.target.id}`)
      },
      { threshold: [0.15, 0.25, 0.35, 0.5], rootMargin: '-12% 0px -58% 0px' }
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [hrefs])

  return active
}

function MenuTypoButton({ open, onClick, isScrolled }) {
  const tone = isScrolled ? 'dark' : 'light'

  return (
    <button
      type="button"
      aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
      aria-expanded={open}
      aria-controls="sp-nav-panel"
      onClick={onClick}
      className={[
        'group relative inline-flex items-center gap-3',
        'h-[40px] px-[14px]',
        // ✅ 枠線は使わない（バグ枠感を避ける）
        'bg-transparent',
        'transition-colors duration-300 ease-quiet',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        tone === 'dark' ? 'text-text' : 'text-whiteish/92',
      ].join(' ')}
    >
      <span
        className={[
          'font-en text-[0.64rem] font-light tracking-[0.36em]',
          'uppercase',
        ].join(' ')}
      >
        MENU
      </span>

      {/* ✅ “線の気配”だけ（押せそう感） */}
      <span
        className={[
          'block h-px w-[28px] bg-current',
          'opacity-35 transition-all duration-300 ease-quiet',
          open ? 'w-[34px] opacity-55' : 'group-hover:w-[34px] group-hover:opacity-55',
        ].join(' ')}
      />
    </button>
  )
}

function CloseIconButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="メニューを閉じる"
      className={[
        'relative inline-flex items-center justify-center',
        'h-[40px] w-[44px]',
        'text-text',
        'transition-opacity duration-300 ease-quiet hover:opacity-80',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
      ].join(' ')}
    >
      <span className="absolute left-1/2 top-1/2 h-px w-[18px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
      <span className="absolute left-1/2 top-1/2 h-px w-[18px] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
    </button>
  )
}

export default function NavSP() {
  const isScrolled = useScrolledNav(60)
  const [open, setOpen] = useState(false)

  const hrefList = useMemo(() => ['#hero', ...navLinks.map((l) => l.href), '#reserve'], [])
  const active = useActiveSection(hrefList)

  // ESCで閉じる
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // open中 背面スクロール抑制
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      {/* ===== Top Nav (SP) ===== */}
      <nav
        className={[
          'fixed inset-x-0 top-0 z-[500]',
          'flex items-center justify-between',
          'border-b border-transparent',
          'transition-all duration-500 ease-quiet',
          'px-[18px]',
          isScrolled
            ? 'py-[14px] border-border/55 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]'
            : 'py-[22px]',
        ].join(' ')}
        style={
          isScrolled
            ? {
                background: 'rgba(250,247,242,0.82)',
                boxShadow:
                  '0 1px 0 rgba(216,209,196,0.20), 0 6px 22px rgba(30,22,12,0.05)',
              }
            : undefined
        }
        aria-label="Primary"
      >
        {/* Brand */}
        <a
          href="#hero"
          className="group flex items-center gap-3 no-underline"
          aria-label="トップへ"
          onClick={() => setOpen(false)}
        >
          <span className="flex flex-col gap-[3px]">
            <span
              className={[
                'font-en text-[0.96rem] font-light tracking-[0.22em] transition-colors duration-500',
                isScrolled ? 'text-text' : 'text-whiteish/95',
              ].join(' ')}
            >
              NAGI
            </span>
            <span
              className={[
                'font-ja text-[0.56rem] font-light tracking-[0.28em] transition-colors duration-500',
                isScrolled ? 'text-text-lt' : 'text-[rgba(210,195,168,0.70)]',
              ].join(' ')}
            >
              タイ古式マッサージ
            </span>
          </span>

          {/* Palm（気配だけ） */}
          <img
            src="/images/palm-cutout.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            decoding="async"
            className={[
              'pointer-events-none select-none',
              'h-[30px] w-auto',
              'transition-all duration-500 ease-quiet',
              isScrolled
                ? 'opacity-0 -translate-y-[2px] scale-[0.985]'
                : 'opacity-[0.24] translate-y-0 scale-100 group-hover:opacity-[0.32]',
            ].join(' ')}
            style={{
              filter: isScrolled
                ? 'grayscale(1) saturate(0) contrast(1.02) brightness(1.02)'
                : 'saturate(1.10) hue-rotate(-10deg) brightness(1.00) contrast(1.04)',
            }}
          />
        </a>

        {/* Right：MENUだけ（予約は消す） */}
        <MenuTypoButton
          open={open}
          onClick={() => setOpen((v) => !v)}
          isScrolled={isScrolled}
        />
      </nav>

      {/* ===== Overlay Panel ===== */}
      <div
        id="sp-nav-panel"
        className={[
          'fixed inset-0 z-[600]',
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
          style={{ background: open ? 'rgba(18, 14, 10, 0.42)' : 'transparent' }}
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
            boxShadow: '0 12px 34px rgba(30,22,12,0.09)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-[18px] pb-[14px]"
            style={{ paddingTop: 'calc(14px + env(safe-area-inset-top))' }}
          >
            <a
              href="#hero"
              className="flex flex-col gap-[3px] no-underline"
              onClick={() => setOpen(false)}
            >
              <span className="font-en text-[0.96rem] font-light tracking-[0.22em] text-text">
                NAGI
              </span>
              <span className="font-ja text-[0.56rem] font-light tracking-[0.28em] text-text-lt">
                タイ古式マッサージ
              </span>
            </a>

            <CloseIconButton onClick={() => setOpen(false)} />
          </div>

          <div className="h-px w-full bg-border/55" />

          {/* Content */}
          <div className="px-[18px] py-6">
            {/* ✅ Reserveをここに移動（トップから消す） */}
            <a
              href="#reserve"
              onClick={() => setOpen(false)}
              className={[
                'mb-6 block',
                'bg-whiteish/[0.82] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)]',
                'shadow-[inset_0_0_0_1px_rgba(176,144,96,0.18)]',
                'px-5 py-[14px]',
                'no-underline transition-all duration-300 ease-quiet',
                'hover:bg-whiteish/[0.92] hover:shadow-[inset_0_0_0_1px_rgba(176,144,96,0.26)]',
              ].join(' ')}
            >
              <span className="block font-en text-[0.58rem] font-light tracking-[0.34em] text-gold">
                RESERVE
              </span>
              <span className="mt-2 block font-ja text-[0.86rem] font-light tracking-[0.14em] text-text">
                ご予約へ進む
              </span>
              <span className="mt-1 block font-ja text-[0.66rem] font-light tracking-[0.10em] text-text/55">
                LINE / Web / TEL
              </span>
            </a>

            <ul className="m-0 grid list-none gap-3 p-0">
              {navLinks.map((link) => {
                const isActive = active === link.href
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'block py-3 font-ja text-[0.90rem] font-light tracking-[0.16em] no-underline',
                        'transition-colors duration-300',
                        isActive ? 'text-text' : 'text-text/70 hover:text-text',
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

            <p className="mt-5 font-ja text-[0.66rem] font-light tracking-[0.14em] text-text/55">
              静かに整えるための道順
            </p>
          </div>
        </div>
      </div>
    </>
  )
}