// src/sections/sp/ReserveSectionSP.jsx
import useReveal from '../../hooks/useReveal'
import TextureOverlay from '../../components/TextureOverlay'

const revealBase =
  'translate-y-[14px] scale-[0.997] opacity-0 will-change-transform ' +
  'transition-[opacity,transform] duration-[1050ms] ease-quiet ' +
  'motion-safe:data-[revealed=true]:translate-y-0 motion-safe:data-[revealed=true]:scale-100 motion-safe:data-[revealed=true]:opacity-100'

export default function ReserveSectionSP() {
  const labelRef = useReveal()
  const headingRef = useReveal()
  const subRef = useReveal()
  const btnsRef = useReveal()
  const telRef = useReveal()

  return (
    <section
      id="reserve"
      className="relative overflow-hidden bg-surface px-[18px] py-[clamp(120px,14vw,180px)] text-center"
    >
      {/* 気配（締めの鈍金） */}
      <TextureOverlay
        src="/textures/brass.webp"
        opacity={0.032}
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
            'radial-gradient(circle at 50% 10%, rgba(255,238,204,0.18), transparent 62%), linear-gradient(to bottom, rgba(242,237,228,0.70), rgba(237,231,220,0.92))',
        }}
      />

      <div className="relative z-[1] mx-auto max-w-[560px]">
        <p
          ref={labelRef}
          className={[
            revealBase,
            'mb-4 inline-flex items-center justify-center gap-3.5 uppercase tracking-quiet-xl text-gold',
          ].join(' ')}
        >
          <span className="font-en text-[0.58rem]">RESERVATION</span>
          <span className="h-px w-7 bg-gold/45" />
        </p>

        <h2
          ref={headingRef}
          className={[
            revealBase,
            'mb-3.5 delay-100 font-ja text-[clamp(1.45rem,7vw,2.05rem)] font-extralight tracking-[0.12em] text-text',
          ].join(' ')}
        >
          ご予約
        </h2>

        <p
          ref={subRef}
          className={[
            revealBase,
            'mb-10 delay-[200ms] text-[0.82rem] font-light leading-[2.05] tracking-[0.1em] text-text-mid',
          ].join(' ')}
        >
          初めてのご来店も、定期的にお通いの方も、
          <br />
          お気軽にご連絡ください。
        </p>

        {/* Buttons（SPは縦積みで“静かに強い”） */}
        <div
          ref={btnsRef}
          className={[
            revealBase,
            'delay-[320ms]',
            'mx-auto flex max-w-[420px] flex-col gap-3',
          ].join(' ')}
        >
          {/* Primary：LINE（静かに強い） */}
          <a
            href="#"
            aria-label="LINEで予約する"
            className={[
              'w-full px-6 py-[14px]',
              'bg-text text-whiteish',
              'font-ja text-[0.74rem] font-light tracking-[0.22em] no-underline',
              'transition-[background-color] duration-300 ease-quiet',
              'hover:bg-wood',
              'focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
            ].join(' ')}
          >
            LINE で予約する
          </a>

          {/* Secondary：Web（枠線ではなくinset shadowで品） */}
          <a
            href="#"
            aria-label="Webで予約する"
            className={[
              'w-full px-6 py-[14px]',
              'bg-whiteish/[0.62] text-text',
              'backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)]',
              'shadow-[inset_0_0_0_1px_rgba(216,209,196,0.75)]',
              'font-ja text-[0.74rem] font-light tracking-[0.22em] no-underline',
              'transition-[background-color,box-shadow] duration-300 ease-quiet',
              'hover:bg-whiteish/[0.74]',
              'hover:shadow-[inset_0_0_0_1px_rgba(139,106,82,0.28)]',
              'focus:outline-none focus-visible:ring-1 focus-visible:ring-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
            ].join(' ')}
          >
            Web で予約する
          </a>
        </div>

        {/* Tel（ダミー番号は出さない） */}
        <div
          ref={telRef}
          className={[revealBase, 'mt-10 delay-[420ms]'].join(' ')}
        >
          <div className="font-en text-[0.6rem] tracking-[0.3em] text-text-lt">
            TEL
          </div>
          <div className="mt-2.5 font-ja text-[0.92rem] font-light tracking-[0.06em] text-text-lt">
            お電話は準備中
          </div>
        </div>
      </div>
    </section>
  )
}