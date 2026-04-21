// src/sections/sp/NoticeSectionSP.jsx
import { notices } from '../../data/siteData'
import useReveal from '../../hooks/useReveal'

const revealBase =
  'translate-y-[14px] scale-[0.997] opacity-0 will-change-transform ' +
  'transition-[opacity,transform] duration-[1050ms] ease-quiet ' +
  'motion-safe:data-[revealed=true]:translate-y-0 motion-safe:data-[revealed=true]:scale-100 motion-safe:data-[revealed=true]:opacity-100'

export default function NoticeSectionSP() {
  const labelRef = useReveal()
  const headingRef = useReveal()
  const leadRef = useReveal()
  const listRef = useReveal()

  const items = (notices ?? []).slice(0, 3)

  return (
    <section
      id="notice"
      className="bg-bg px-[18px] pt-[clamp(140px,16vw,210px)] pb-[clamp(140px,16vw,210px)]"
      aria-label="お知らせ"
    >
      <div className="mx-auto max-w-[560px]">
        {/* ===== Header（息：上に余白、下に余白） ===== */}
        <div className="mb-12">
          <p
            ref={labelRef}
            className={[
              revealBase,
              'mb-4 inline-flex items-center gap-3.5 uppercase tracking-quiet-xl text-gold',
            ].join(' ')}
          >
            <span className="font-en text-[0.58rem]">NOTICE</span>
            <span className="h-px w-7 bg-gold/45" />
          </p>

          <h2
            ref={headingRef}
            className={[
              revealBase,
              'delay-100 font-ja text-[clamp(1.35rem,6.2vw,1.9rem)] font-extralight tracking-[0.1em] text-text',
            ].join(' ')}
          >
            お知らせ
          </h2>

          <p
            ref={leadRef}
            className={[
              revealBase,
              'delay-[180ms] mt-6 text-[0.74rem] font-light leading-[2.05] tracking-[0.06em] text-text-lt',
            ].join(' ')}
          >
            予約前の確認事項だけ、静かにまとめています。
          </p>
        </div>

        {/* ===== List ===== */}
        <div
          ref={listRef}
          className={[revealBase, 'delay-[240ms] border-t border-border'].join(' ')}
        >
          {items.map((n) => (
            <article key={`${n.date}-${n.title}`} className="border-b border-border-lt py-7">
              <div className="mb-2 flex flex-wrap items-baseline gap-3">
                <time className="font-en text-[0.66rem] font-light tracking-[0.18em] text-text-lt">
                  {n.date}
                </time>
                <h3 className="font-ja text-[0.92rem] font-light tracking-[0.08em] text-text">
                  {n.title}
                </h3>
              </div>

              <p className="text-[0.78rem] font-light leading-[2.05] tracking-[0.06em] text-text-mid">
                {n.body}
              </p>
            </article>
          ))}

          {/* Breath space + dummy link */}
          <div className="pt-10">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-4 font-ja text-[0.72rem] font-light tracking-[0.18em] text-text-mid no-underline transition-colors duration-300 hover:text-text"
            >
              すべて見る
              <span className="h-px w-10 bg-gold/55" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}