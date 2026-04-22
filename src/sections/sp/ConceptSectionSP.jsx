// src/sections/ConceptSection.jsx（SP版）
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

// ✅ SPは “border-l” をやめて、静かな面に寄せる
function ConceptValue({ item, delay = '' }) {
  const ref = useReveal()

  return (
    <div
      ref={ref}
      className={[
        revealBase,
        'rounded-none border border-border-lt bg-whiteish/55',
        'px-6 py-6',
        'backdrop-blur-[2px] [-webkit-backdrop-filter:blur(2px)]',
        delay,
      ].join(' ')}
    >
      <p className="mb-2 font-en text-[0.56rem] font-light tracking-[0.30em] text-gold">
        {item.en}
      </p>
      <p className="text-[0.84rem] font-light leading-[2.05] tracking-[0.06em] text-text-mid">
        {nl2br(item.ja)}
      </p>
    </div>
  )
}

export default function ConceptSectionSP() {
  const labelRef = useReveal()
  const headingRef = useReveal()
  const bodyRef = useReveal()

  return (
    <section
      id="concept"
      className="
        relative overflow-hidden bg-whiteish px-side
        pt-[clamp(120px,15vw,180px)] pb-[clamp(110px,14vw,170px)]
      "
    >
      {/* ===== 空気レイヤー（素材） ===== */}
      <TextureOverlay
        src="/textures/palm-shadow.png"
        opacity={0.085}
        blend="multiply"
        position="center"
        className="palm-sway"
      />

      {/* 光膜：SPは濃すぎると白っぽくなるので少し控えめ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[0]"
        style={{
          background:
            'radial-gradient(circle at 22% 24%, rgba(255,255,255,0.74), transparent 52%), linear-gradient(to bottom, rgba(255,255,255,0.52), rgba(255,255,255,0.12) 55%, rgba(255,255,255,0.42))',
        }}
      />

      {/* ===== Content ===== */}
      <div className="relative z-[1] mx-auto max-w-[560px]">
        {/* Header block */}
        <div className="mb-12">
          <p
            ref={labelRef}
            className={[
              revealBase,
              'mb-8 inline-flex items-center gap-3.5 uppercase tracking-quiet-xl text-gold',
            ].join(' ')}
          >
            <span className="font-en text-micro">CONCEPT</span>
            <span className="h-px w-7 bg-gold/45" />
          </p>

          <h2
            ref={headingRef}
            className={[
              revealBase,
              'mb-8 delay-100 font-ja text-[clamp(1.55rem,7.2vw,2.25rem)] font-extralight',
              'leading-[1.58] tracking-[0.10em] text-text',
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
              'delay-200 text-[0.90rem] font-light leading-[2.25] tracking-[0.05em] text-text-mid',
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

        {/* Values */}
        <div className="flex flex-col gap-6">
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