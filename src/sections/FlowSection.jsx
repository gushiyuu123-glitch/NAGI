import { flowSteps } from '../data/siteData'
import useReveal from '../hooks/useReveal'

const revealBase =
  'translate-y-[18px] scale-[0.995] opacity-0 will-change-transform ' +
  'transition-[opacity,transform] duration-[1050ms] [transition-timing-function:cubic-bezier(0.22,0.1,0.28,1)] ' +
  'motion-safe:data-[revealed=true]:translate-y-0 motion-safe:data-[revealed=true]:scale-100 motion-safe:data-[revealed=true]:opacity-100'

const stepDelays = ['', 'delay-100', 'delay-[220ms]', 'delay-[340ms]', 'delay-[460ms]']

function FlowItem({ item, delayClass = '' }) {
  const ref = useReveal()

  return (
    <div ref={ref} className={`${revealBase} pr-3 ${delayClass}`}>
      {/* 接続点（ラインと噛み合わせる） */}
      <div className="relative z-[1] mb-4 h-[9px] w-[9px] rounded-full border border-gold bg-bg-warm" />

      {/* ✅ 画像：正方形気味（高さを幅に追従） */}
      <div className="relative mb-6 w-[92%] max-w-[180px] overflow-hidden rounded-quiet border border-border-lt bg-whiteish/55">
        <div className="relative aspect-square">
          <img
            src={item.img}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{
              // トーン統一（派手色を殺して“上質”に揃える）
              filter: 'saturate(0.92) brightness(1.02) contrast(1.04)',
            }}
          />

          {/* うっすい光膜（太陽感を“外光の気配”として） */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 22% 22%, rgba(255,238,204,0.18), transparent 55%)',
              mixBlendMode: 'screen',
              opacity: 0.9,
            }}
          />
        </div>
      </div>

      <span className="mb-2.5 block font-en text-[0.58rem] font-light tracking-[0.28em] text-gold">
        {item.num}
      </span>

      <p className="mb-2.5 text-[0.88rem] font-light tracking-[0.1em] text-text">
        {item.step}
      </p>

      <p className="text-[0.7rem] font-light leading-[1.95] tracking-[0.05em] text-text-lt">
        {item.note}
      </p>
    </div>
  )
}

export default function FlowSection() {
  const labelRef = useReveal()
  const headingRef = useReveal()

  return (
    <section id="flow" className="bg-whiteish px-side py-[clamp(140px,16vw,220px)]">
      <div className="mx-auto max-w-site">
        <p
          ref={labelRef}
          className={`${revealBase} mb-4 inline-flex items-center gap-3.5 uppercase tracking-quiet-xl text-gold`}
        >
          <span className="font-en text-[0.58rem]">FIRST VISIT</span>
          <span className="h-px w-7 bg-gold/45" />
        </p>

        <h2
          ref={headingRef}
          className={`${revealBase} mb-[72px] delay-100 font-ja text-[clamp(1.4rem,2.5vw,2rem)] font-extralight tracking-[0.1em] text-text`}
        >
          はじめての方へ
        </h2>

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-0">
          {/* 横ライン（ドットの位置＝topに合わせる） */}
          <div className="absolute left-3 right-3 top-[10px] hidden h-px bg-border md:block" />

          {flowSteps.map((item, index) => (
            <FlowItem key={item.num} item={item} delayClass={stepDelays[index] || ''} />
          ))}
        </div>
      </div>
    </section>
  )
}