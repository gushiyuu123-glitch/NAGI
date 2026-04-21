// src/sections/sp/FooterSP.jsx
import { useEffect, useRef } from 'react'

const footerLinks = [
  { href: '#concept', label: 'コンセプト' },
  { href: '#treatment', label: '施術メニュー' },
  { href: '#flow', label: 'はじめての方へ' },
  { href: '#access', label: 'アクセス' },
  { href: '#reserve', label: 'ご予約' },
]

const shopInfo = [
  { label: '住所', value: '沖縄県那覇市○○ 1-2-3' },
  { label: '営業時間', value: '10:00 — 21:00（最終受付 20:00）' },
  { label: '定休日', value: '不定休' },
  // ✅ ダミー番号の不快感を避ける（必要なら後で差し替え）
  { label: 'TEL', value: 'お電話は準備中' },
]

export default function FooterSP() {
  const rootRef = useRef(null)

  // 焚火“っぽい”＝火ではなく余韻の熱（embers）のゆらぎ
  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduce) return

    let raf = 0
    const start = performance.now()

    const tick = (t) => {
      const tt = (t - start) / 1000

      // 乱数なし：sin複合で“自然なゆらぎ”だけ（音量小）
      const ember =
        0.58 +
        0.16 * Math.sin(tt * 1.15) +
        0.08 * Math.sin(tt * 2.05 + 1.7) +
        0.04 * Math.sin(tt * 3.8 + 0.3)

      const emberX = 58 + 6 * Math.sin(tt * 0.16) + 2 * Math.sin(tt * 0.38 + 0.7)
      const emberY = 86 + 2 * Math.sin(tt * 0.22) + 1 * Math.sin(tt * 0.55 + 1.3)

      el.style.setProperty('--ember', ember.toFixed(3))
      el.style.setProperty('--emberX', `${emberX.toFixed(2)}%`)
      el.style.setProperty('--emberY', `${emberY.toFixed(2)}%`)

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <footer
      ref={rootRef}
      className="relative overflow-hidden bg-[#1E1A14] text-white/50"
      style={{
        // 初期値（JSが上書き）
        '--ember': 0.65,
        '--emberX': '58%',
        '--emberY': '86%',
      }}
    >
      {/* ===== 背景（画像＋暗幕＋embers） ===== */}
      <div className="pointer-events-none absolute inset-0 z-[0]" aria-hidden>
        <img
          src="/images/footer-ambience.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          style={{
            // ✅ “見える”ようにする（でも文字を殺さない）
            opacity: 0.42,
            filter: 'saturate(1.02) brightness(0.86) contrast(1.14)',
            transform: 'scale(1.05)',
            objectPosition: '60% 54%',
            mixBlendMode: 'soft-light',
          }}
        />

        {/* 暗幕：強すぎると画像が消えるので抑える */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,8,6,0.42) 0%, rgba(10,8,6,0.58) 55%, rgba(10,8,6,0.72) 100%)',
          }}
        />

        {/* 余韻の熱（embers）：火ではなく“あたたかい残光” */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at var(--emberX) var(--emberY),
                rgba(255, 180, 90, calc(0.16 * var(--ember))) 0%,
                rgba(255, 150, 70, calc(0.08 * var(--ember))) 26%,
                transparent 62%
              ),
              radial-gradient(circle at calc(var(--emberX) - 18%) calc(var(--emberY) + 6%),
                rgba(255, 210, 140, calc(0.08 * var(--ember))) 0%,
                transparent 58%
              )
            `,
            mixBlendMode: 'screen',
            opacity: 0.85,
          }}
        />

        {/* 鈍金の“底の気配” */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(176,144,96,0.10) 0%, transparent 48%)',
            opacity: 0.8,
          }}
        />
      </div>

      {/* ===== Content（SP：縦積み・18px余白） ===== */}
      <div className="relative z-[1] px-[18px] pt-[clamp(72px,10vw,96px)] pb-[clamp(56px,8vw,80px)]">
        <div className="mx-auto max-w-[560px]">
          {/* Brand */}
          <a href="#hero" className="inline-flex flex-col gap-[6px] no-underline">
            <span className="font-en text-[1.02rem] font-light tracking-[0.22em] text-white/86">
              NAGI
            </span>
            <span className="font-ja text-[0.58rem] font-light tracking-[0.26em] text-white/36">
              タイ古式マッサージ
            </span>
          </a>

          <p className="mt-6 font-ja text-[0.72rem] font-light leading-[2.05] tracking-[0.06em] text-white/38">
            沖縄県那覇市にある、タイ古式マッサージサロン。
            <br />
            地元の方の日常に寄り添い、
            <br />
            旅行中の方の疲れをほどく、静かな回復の場所。
          </p>

          {/* Separator */}
          <div className="mt-10 h-px w-full bg-white/[0.06]" />

          {/* Menu */}
          <div className="mt-10">
            <p className="mb-5 font-en text-[0.56rem] font-light tracking-[0.36em] text-white/26 uppercase">
              Menu
            </p>
            <nav className="flex flex-col gap-[14px]">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="w-fit font-ja text-[0.78rem] font-light tracking-[0.14em] text-white/52 no-underline transition-colors duration-300 hover:text-white/82"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* ✅ 予約導線：静かな1行CTA（ボタン圧を下げる） */}
            <a
              href="#reserve"
              className="mt-8 inline-flex items-center gap-4 font-ja text-[0.74rem] font-light tracking-[0.18em] text-white/62 no-underline transition-colors duration-300 hover:text-white/86"
            >
              ご予約へ進む
              <span className="h-px w-10 bg-[rgba(176,144,96,0.45)]" />
            </a>
          </div>

          {/* Separator */}
          <div className="mt-10 h-px w-full bg-white/[0.06]" />

          {/* Shop info */}
          <div className="mt-10">
            <p className="mb-5 font-en text-[0.56rem] font-light tracking-[0.36em] text-white/26 uppercase">
              Access
            </p>

            <dl className="flex flex-col gap-[14px]">
              {shopInfo.map((item) => (
                <div key={item.label} className="flex flex-col gap-[3px]">
                  <dt className="font-ja text-[0.58rem] font-light tracking-[0.18em] text-white/28">
                    {item.label}
                  </dt>
                  <dd className="font-ja text-[0.76rem] font-light leading-[1.85] tracking-[0.08em] text-white/56">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Bottom */}
          <div className="mt-12 border-t border-white/[0.06] pt-6">
            <p className="font-en text-[0.56rem] font-light tracking-[0.2em] text-white/22">
              © 2025 IN OKINAWA. All rights reserved.
            </p>

            <a
              href="https://gushikendesign.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-[10px] font-en text-[0.56rem] font-light tracking-[0.2em] text-white/22 no-underline transition-colors duration-300 hover:text-white/45"
            >
              <span className="block h-px w-5" style={{ background: 'rgba(176,144,96,0.28)' }} />
              Designed by Gushiken Design
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}