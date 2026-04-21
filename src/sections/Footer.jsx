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
  { label: 'TEL', value: '098-000-0000', href: 'tel:0980000000' },
]

export default function Footer() {
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

      // 乱数は使わず、複数sinで“自然なゆらぎ”だけ作る（音量小）
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
      className="footer-root relative overflow-hidden bg-[#1E1A14] text-white/50"
      style={{
        // 初期値（JSが上書きする）
        '--ember': 0.65,
        '--emberX': '58%',
        '--emberY': '86%',
      }}
    >
      {/* ===== 背景画像（差し込み） ===== */}
     <div className="pointer-events-none absolute inset-0 z-[0]">
  <img
    src="/images/footer-ambience.png"
    alt=""
    aria-hidden="true"
    className="absolute inset-0 h-full w-full object-cover"
    style={{
      opacity: 0.32,
      filter: 'saturate(0.95) brightness(0.78) contrast(1.12)',
      transform: 'scale(1.03)',
      objectPosition: '62% 52%',
      mixBlendMode: 'soft-light',
    }}
    loading="lazy"
    decoding="async"
  />

  <div
    className="absolute inset-0"
    style={{
      background:
        'linear-gradient(to bottom, rgba(10,8,6,0.52) 0%, rgba(10,8,6,0.70) 55%, rgba(10,8,6,0.82) 100%)',
    }}
  />

  {/* 余韻の熱（embers） */}
  <div
    className="absolute inset-0"
    style={{
      background: `
        radial-gradient(circle at var(--emberX) var(--emberY),
          rgba(255, 180, 90, calc(0.16 * var(--ember))) 0%,
          rgba(255, 150, 70, calc(0.08 * var(--ember))) 25%,
          transparent 62%
        ),
        radial-gradient(circle at calc(var(--emberX) - 18%) calc(var(--emberY) + 6%),
          rgba(255, 210, 140, calc(0.08 * var(--ember))) 0%,
          transparent 58%
        )
      `,
      mixBlendMode: 'screen',
      opacity: 0.9,
    }}
  />

  <div
    className="absolute inset-0"
    style={{
      background: 'linear-gradient(to top, rgba(176,144,96,0.10) 0%, transparent 48%)',
      opacity: 0.8,
    }}
  />
</div>

      {/* ===== コンテンツ ===== */}
      <div className="relative z-[1]">
        {/* ── メインエリア ── */}
        <div
          className="
            grid grid-cols-1 gap-14
            px-[clamp(40px,6vw,100px)] py-[clamp(64px,8vw,96px)]
            md:grid-cols-3
          "
        >
          {/* 左：ロゴ + 説明 */}
          <div className="flex flex-col gap-5">
            <a href="#hero" className="flex flex-col gap-[5px] no-underline">
              <span className="font-serif text-[1rem] font-light tracking-[0.22em] text-white/80">
                NAGI
              </span>
              <span className="font-sans text-[0.58rem] font-light tracking-[0.26em] text-white/35">
                タイ古式マッサージ
              </span>
            </a>

            <p className="font-sans text-[0.7rem] font-light leading-[2.0] tracking-[0.06em] text-white/35">
              沖縄県那覇市にある、タイ古式マッサージサロン。
              <br />
              地元の方の日常に寄り添い、
              <br className="hidden md:block" />
              旅行中の方の疲れをほどく、静かな回復の場所。
            </p>
          </div>

          {/* 中：ナビ */}
          <div className="flex flex-col gap-1 md:items-center">
            <p className="mb-5 font-serif text-[0.55rem] font-light tracking-[0.36em] text-white/25 uppercase">
              Menu
            </p>

            <nav className="flex flex-col gap-[14px]">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="
                    w-fit font-sans text-[0.72rem] font-light
                    tracking-[0.16em] text-white/45
                    transition-colors duration-300 hover:text-white/80
                  "
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* 右：店舗情報 */}
          <div>
            <p className="mb-5 font-serif text-[0.55rem] font-light tracking-[0.36em] text-white/25 uppercase">
              Access
            </p>

            <dl className="flex flex-col gap-[14px]">
              {shopInfo.map((item) => (
                <div key={item.label} className="flex flex-col gap-[3px]">
                  <dt className="font-sans text-[0.58rem] font-light tracking-[0.18em] text-white/25">
                    {item.label}
                  </dt>

                  <dd className="font-sans text-[0.72rem] font-light leading-[1.8] tracking-[0.08em] text-white/55">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="transition-colors duration-300 hover:text-white/80"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            {/* 予約ボタン（角丸なし／セパレーション控えめ） */}
            <a
              href="#reserve"
              className="
                mt-8 inline-block
                border border-[rgba(176,144,96,0.28)]
                bg-[rgba(255,252,245,0.02)]
                px-6 py-[10px]
                font-sans text-[0.65rem] font-light tracking-[0.22em]
                text-white/60
                transition-all duration-300
                hover:border-[rgba(176,144,96,0.55)] hover:text-white/85 hover:bg-[rgba(176,144,96,0.06)]
              "
            >
              ご予約はこちら
            </a>
          </div>
        </div>

        {/* ── ボトムバー ── */}
        <div
          className="
            flex flex-col items-start justify-between gap-3
            border-t border-white/[0.06]
            px-[clamp(40px,6vw,100px)] py-6
            sm:flex-row sm:items-center
          "
        >
          <p className="font-serif text-[0.55rem] font-light tracking-[0.2em] text-white/22">
            © 2025 IN OKINAWA. All rights reserved.
          </p>

          <a
            href="https://gushikendesign.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-[10px]
              font-serif text-[0.55rem] font-light tracking-[0.2em]
              text-white/22 no-underline
              transition-colors duration-300 hover:text-white/50
            "
          >
            <span className="block h-px w-5" style={{ background: 'rgba(176,144,96,0.3)' }} />
            Designed by Gushiken Design
          </a>
        </div>
      </div>
    </footer>
  )
}