// src/sections/sp/FlowSectionSP.jsx
import { flowSteps } from '../../data/siteData'
import useReveal from '../../hooks/useReveal'

const revealBase =
  'translate-y-[14px] scale-[0.997] opacity-0 will-change-transform ' +
  'transition-[opacity,transform] duration-[1050ms] ease-quiet ' +
  'motion-safe:data-[revealed=true]:translate-y-0 motion-safe:data-[revealed=true]:scale-100 motion-safe:data-[revealed=true]:opacity-100'

const stepDelays = ['', 'delay-75', 'delay-150', 'delay-[220ms]', 'delay-[300ms]']

function FlowItem({ item, delayClass = '' }) {
  const ref = useReveal()

  return (
    <div ref={ref} className={`${revealBase} ${delayClass} relative pl-8`}>
      {/* タイムラインのドット */}
      <span className="absolute left-[3px] top-[10px] z-[2] h-[9px] w-[9px] rounded-full border border-gold bg-bg-warm" />

      <div className="grid grid-cols-[96px_1fr] gap-4">
        {/* 正方形画像（角丸なし） */}
        <div className="relative aspect-square w-[96px] overflow-hidden border border-border-lt bg-whiteish/55">
          <img
            src={item.img}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{ filter: 'saturate(0.92) brightness(1.02) contrast(1.04)' }}
          />
          {/* うっすい光膜（太陽感＝外光の気配） */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 22% 22%, rgba(255,238,204,0.16), transparent 58%)',
              mixBlendMode: 'screen',
              opacity: 0.9,
            }}
          />
        </div>

        {/* テキスト */}
        <div className="pt-[2px]">
          <span className="mb-2 block font-en text-[0.56rem] font-light tracking-[0.28em] text-gold">
            {item.num}
          </span>

          <p className="mb-2 text-[0.95rem] font-light tracking-[0.1em] text-text">
            {item.step}
          </p>

          <p className="text-[0.72rem] font-light leading-[1.95] tracking-[0.05em] text-text-lt">
            {item.note}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FlowSectionSP() {
  const labelRef = useReveal()
  const headingRef = useReveal()

  return (
    <section
      id="flow"
      className="bg-whiteish px-[18px] py-[clamp(120px,14vw,180px)]"
    >
      <div className="mx-auto max-w-[560px]">
        <p
          ref={labelRef}
          className={`${revealBase} mb-4 inline-flex items-center gap-3.5 uppercase tracking-quiet-xl text-gold`}
        >
          <span className="font-en text-[0.58rem]">FIRST VISIT</span>
          <span className="h-px w-7 bg-gold/45" />
        </p>

        <h2
          ref={headingRef}
          className={`${revealBase} mb-10 delay-100 font-ja text-[clamp(1.35rem,6.2vw,1.9rem)] font-extralight tracking-[0.1em] text-text`}
        >
          はじめての方へ
        </h2>

        {/* 縦ライン（タイムライン） */}
        <div className="relative">
          <div className="absolute left-[7px] top-[8px] bottom-[8px] w-px bg-border/70" />

          <div className="grid gap-10">
            {flowSteps.map((item, index) => (
              <FlowItem
                key={item.num}
                item={item}
                delayClass={stepDelays[index] || ''}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}