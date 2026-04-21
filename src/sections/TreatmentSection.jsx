// src/sections/TreatmentSection.jsx
import { treatments } from '../data/siteData'
import useReveal from '../hooks/useReveal'
import TextureOverlay from '../components/TextureOverlay'

function nl2br(text) {
  return text.split('\n').map((line, index, arr) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < arr.length - 1 && <br />}
    </span>
  ))
}

/* 見出し/説明（従来どおり：下→上） */
const revealBase =
  'translate-y-[18px] scale-[0.995] opacity-0 will-change-transform ' +
  'transition-[opacity,transform] duration-quiet ease-quiet ' +
  'motion-safe:data-[revealed=true]:translate-y-0 motion-safe:data-[revealed=true]:scale-100 motion-safe:data-[revealed=true]:opacity-100'

/* メニュー行（変更：左→右） */
const revealRow =
  'translate-x-[-18px] scale-[0.995] opacity-0 will-change-transform ' +
  'transition-[opacity,transform,background-color] duration-quiet ease-quiet ' +
  'motion-safe:data-[revealed=true]:translate-x-0 motion-safe:data-[revealed=true]:scale-100 motion-safe:data-[revealed=true]:opacity-100'

function TreatmentItem({ item, delay = '' }) {
  const ref = useReveal()

  return (
    <div
      ref={ref}
      className={[
        // layout
        'grid cursor-default grid-cols-1 gap-6 border-b border-border-lt py-9',
        'md:grid-cols-[1fr_100px_120px] md:items-center md:gap-10',

        // hover（revealのdurationは維持しつつ、hoverだけ速く）
        'hover:bg-gold/[0.03] hover:duration-300',

        // reveal motion（左から）
        revealRow,
        delay,
      ].join(' ')}
    >
      <div>
        <span className="mb-1 block font-en text-[0.6rem] font-light tracking-[0.3em] text-gold">
          {item.en}
        </span>

        <p className="mb-2 text-base font-light tracking-[0.12em] text-text">
          {item.name}
        </p>

        <p className="text-[0.72rem] font-light leading-[1.9] tracking-[0.06em] text-text-lt">
          {nl2br(item.desc)}
        </p>
      </div>

      <span className="text-left font-en text-[0.8rem] font-light tracking-[0.15em] text-text-mid md:text-center">
        {item.time}
      </span>

      <span className="text-left font-en text-[1.05rem] font-light tracking-[0.04em] text-text md:text-right">
        {item.price}
        <small className="ml-1 text-[0.6rem] tracking-[0.12em] text-text-lt">
          tax in
        </small>
      </span>
    </div>
  )
}

export default function TreatmentSection() {
  const labelRef = useReveal()
  const headingRef = useReveal()
  const noteRef = useReveal()

  return (
    <section
      id="treatment"
      className="relative overflow-hidden bg-bg px-side py-[clamp(120px,12vw,180px)]"
    >
      {/* ===== 素材（信頼・清潔） ===== */}
      <TextureOverlay
        src="/textures/linen-wood1.png"
        opacity={0.07}
        blend="multiply"
        position="center"
        className="scale-[1.04] origin-center"
      />

      {/* fade-out mask（下にいくほど素材を薄くする） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 78%)',
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0) 78%)',
          background:
            'linear-gradient(to bottom, rgba(248,245,240,0.92) 0%, rgba(248,245,240,0.65) 42%, rgba(248,245,240,0.15) 78%, rgba(248,245,240,0.00) 100%)',
        }}
      />

      <div className="relative z-[1] mx-auto max-w-site">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              ref={labelRef}
              className={[
                revealBase,
                'mb-4 inline-flex items-center gap-3.5 uppercase tracking-quiet-xl text-gold',
              ].join(' ')}
            >
              <span className="font-en text-micro">TREATMENT</span>
              <span className="h-px w-7 bg-gold/45" />
            </p>

            <h2
              ref={headingRef}
              className={[
                revealBase,
                'delay-100 font-ja text-[clamp(1.4rem,2.5vw,2rem)] font-extralight tracking-[0.1em] text-text',
              ].join(' ')}
            >
              施術メニュー
            </h2>
          </div>

          <p
            ref={noteRef}
            className={[
              revealBase,
              'delay-100 text-left text-[0.7rem] font-light leading-[1.9] tracking-[0.1em] text-text-lt md:text-right',
            ].join(' ')}
          >
            すべて税込み表示
            <br />
            初回ご来店の方は10分延長サービス
          </p>
        </div>

        <div className="border-t border-border">
          {treatments.map((item, index) => (
            <TreatmentItem
              key={`${item.name}-${item.time}`}
              item={item}
              delay={
                index === 1
                  ? 'delay-100'
                  : index === 2
                  ? 'delay-[220ms]'
                  : index === 3
                  ? 'delay-[340ms]'
                  : ''
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}