// src/sections/ReserveSection.jsx
import useReveal from '../hooks/useReveal'
import TextureOverlay from '../components/TextureOverlay'

const revealBase =
  'translate-y-[18px] scale-[0.995] opacity-0 will-change-transform ' +
  'transition-[opacity,transform] duration-quiet ease-quiet ' +
  'motion-safe:data-[revealed=true]:translate-y-0 motion-safe:data-[revealed=true]:scale-100 motion-safe:data-[revealed=true]:opacity-100'

export default function ReserveSection() {
  const labelRef = useReveal()
  const headingRef = useReveal()
  const subRef = useReveal()
  const btnsRef = useReveal()
  const telRef = useReveal()

  return (
    <section
      id="reserve"
      className="relative overflow-hidden bg-surface px-side py-[clamp(120px,12vw,180px)] text-center"
    >
      {/* 気配（任意：締めの鈍金） */}
      <TextureOverlay
        src="/textures/brass.webp"
        opacity={0.035}
        blend="multiply"
        position="center"
        className="scale-[1.08]"
      />
      {/* 読ませるための薄い光膜（太陽感は“外光の気配”程度） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 12%, rgba(255,238,204,0.20), transparent 62%), linear-gradient(to bottom, rgba(242,237,228,0.72), rgba(237,231,220,0.92))',
        }}
      />

      <div className="relative z-[1] mx-auto max-w-content">
        <p
          ref={labelRef}
          className={[
            revealBase,
            'mb-4 inline-flex items-center justify-center gap-3.5 uppercase tracking-quiet-xl text-gold',
          ].join(' ')}
        >
          <span className="font-en text-micro">RESERVATION</span>
          <span className="h-px w-7 bg-gold/45" />
        </p>

        <h2
          ref={headingRef}
          className={[
            revealBase,
            'mb-3.5 delay-100 font-ja text-[clamp(1.6rem,3vw,2.5rem)] font-extralight tracking-[0.12em] text-text',
          ].join(' ')}
        >
          ご予約
        </h2>

        <p
          ref={subRef}
          className={[
            revealBase,
            'mb-[52px] delay-[220ms] text-[0.82rem] font-light leading-[2.1] tracking-[0.1em] text-text-mid',
          ].join(' ')}
        >
          初めてのご来店も、定期的にお通いの方も、
          <br />
          お気軽にご連絡ください。
        </p>

        {/* Buttons */}
        <div
          ref={btnsRef}
          className={[
            revealBase,
            'mb-11 delay-[340ms]',
            'flex flex-wrap justify-center gap-4',
          ].join(' ')}
        >
          {/* Primary：LINE（静かに強い） */}
          <a
            href="#"
            aria-label="LINEで予約する"
            className={[
              'px-12 py-4',
              'border border-text',
              'bg-text text-whiteish',
              'font-ja text-[0.75rem] font-light tracking-[0.22em] no-underline',
              'transition-[background-color,border-color,color] duration-300 ease-quiet',
              // 黒→木へ（急に派手にしない）
              'hover:border-wood hover:bg-wood',
              'focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
            ].join(' ')}
          >
            LINE で予約する
          </a>

          {/* Secondary：Web（枠を薄くして品を保つ） */}
          <a
            href="#"
            aria-label="Webで予約する"
            className={[
              'px-12 py-4',
              'border border-border',
              'bg-transparent text-text',
              'font-ja text-[0.75rem] font-light tracking-[0.22em] no-underline',
              'transition-[background-color,border-color,color] duration-300 ease-quiet',
              'hover:border-wood hover:bg-[rgba(139,106,82,0.04)]',
              'focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
            ].join(' ')}
          >
            Web で予約する
          </a>
        </div>

     <div
  ref={telRef}
  className={[
    revealBase,
    'delay-[460ms] font-en text-[0.6rem] tracking-[0.3em] text-text-lt',
  ].join(' ')}
>
  TEL
  <div className="mt-2.5 font-ja text-[0.92rem] font-light tracking-[0.06em] text-text-lt">
    お電話は準備中
  </div>
</div>
      </div>
    </section>
  )
}