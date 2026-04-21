// src/sections/ConceptSection.jsx
import { conceptValues } from '../data/siteData'
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

const revealBase =
  'translate-y-[18px] scale-[0.995] opacity-0 will-change-transform ' +
  'transition-[opacity,transform] duration-[1050ms] [transition-timing-function:cubic-bezier(0.22,0.1,0.28,1)] ' +
  'motion-safe:data-[revealed=true]:translate-y-0 motion-safe:data-[revealed=true]:scale-100 motion-safe:data-[revealed=true]:opacity-100'

function ConceptValue({ item, delay = '' }) {
  const ref = useReveal()

  return (
    <div ref={ref} className={[revealBase, 'border-l border-border pl-7', delay].join(' ')}>
      <p className="mb-2 font-en text-micro font-light tracking-[0.32em] text-gold">
        {item.en}
      </p>
      <p className="text-[0.82rem] font-light leading-[1.9] tracking-[0.1em] text-text-mid">
        {nl2br(item.ja)}
      </p>
    </div>
  )
}

export default function ConceptSection() {
  const labelRef = useReveal()
  const headingRef = useReveal()
  const bodyRef = useReveal()

  return (
    <section
      id="concept"
      className="
        relative overflow-hidden bg-whiteish px-side
        pt-[clamp(160px,17vw,240px)] pb-[clamp(150px,16vw,230px)]
      "
    >
      {/* ===== 空気レイヤー（素材） ===== */}
      <TextureOverlay
        src="/textures/palm-shadow.png"
        opacity={0.09}
        blend="multiply"
        position="center"
        className="palm-sway"
      />

      {/* 文字の“安心感”だけ少し補助（画像じゃなく光膜） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[0]"
        style={{
          background:
            'radial-gradient(circle at 22% 30%, rgba(255,255,255,0.78), transparent 50%), linear-gradient(to bottom, rgba(255,255,255,0.58), rgba(255,255,255,0.10) 55%, rgba(255,255,255,0.48))',
        }}
      />

      {/* ===== Content ===== */}
      <div className="relative z-[1] mx-auto grid max-w-site grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="max-w-[560px]">
          <p
            ref={labelRef}
            className={[
              revealBase,
              'mb-12 inline-flex items-center gap-3.5 uppercase tracking-quiet-xl text-gold',
            ].join(' ')}
          >
            <span className="font-en text-micro">CONCEPT</span>
            <span className="h-px w-7 bg-gold/45" />
          </p>

          <h2
            ref={headingRef}
            className={[
              revealBase,
              'mb-12 delay-100 font-ja text-[clamp(1.7rem,3.2vw,2.65rem)] font-extralight',
              'leading-[1.62] tracking-[0.11em] text-text',
            ].join(' ')}
          >
            日常の延長に、
            <br />
            静かな回復を。
          </h2>

          <p
            ref={bodyRef}
            className={[
              revealBase,
              'delay-200 text-[0.88rem] font-light leading-[2.35] tracking-[0.06em] text-text-mid',
            ].join(' ')}
          >
            慌ただしい日々の中で、身体はいつの間にか固まっています。
            <br />
            <br />
            <span className="font-en tracking-[0.12em] text-text">NAGI</span> は、タイ古式マッサージの確かな技術と、沖縄の静けさを重ねた場所。
            <br />
            <br />
            特別な日のためではなく、自分を整えるために通える場所を目指しました。
          </p>
        </div>

        <div className="flex flex-col gap-12 pt-4 lg:pt-[96px]">
          {conceptValues.map((item, index) => (
            <ConceptValue
              key={`${item.en}-${index}`}
              item={item}
              delay={index === 1 ? 'delay-100' : index === 2 ? 'delay-200' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  )
}