// src/sections/NoticeSection.jsx
import { notices } from '../data/siteData'
import useReveal from '../hooks/useReveal'

const revealBase =
  'translate-y-[18px] scale-[0.995] opacity-0 will-change-transform ' +
  'transition-[opacity,transform] duration-quiet ease-quiet ' +
  'motion-safe:data-[revealed=true]:translate-y-0 motion-safe:data-[revealed=true]:scale-100 motion-safe:data-[revealed=true]:opacity-100'

export default function NoticeSection() {
  const labelRef = useReveal()
  const headingRef = useReveal()
  const listRef = useReveal()

  return (
<section
  id="notice"
  className="bg-bg px-side pt-[clamp(140px,14vw,220px)] pb-[clamp(110px,10vw,170px)]"
  aria-label="お知らせ"
>
      <div className="mx-auto grid max-w-site grid-cols-1 gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
        <div>
          <p
            ref={labelRef}
            className={[
              revealBase,
              'mb-4 inline-flex items-center gap-3.5 uppercase tracking-quiet-xl text-gold',
            ].join(' ')}
          >
            <span className="font-en text-micro">NOTICE</span>
            <span className="h-px w-7 bg-gold/45" />
          </p>

          <h2
            ref={headingRef}
            className={[
              revealBase,
              'delay-100 font-ja text-[clamp(1.2rem,2.2vw,1.6rem)] font-extralight tracking-[0.1em] text-text',
            ].join(' ')}
          >
            お知らせ
          </h2>

          <p className="mt-5 text-[0.74rem] font-light leading-[2.0] tracking-[0.06em] text-text-lt">
            予約前の確認事項だけ、静かにまとめています。
          </p>
        </div>

        <div
          ref={listRef}
          className={[revealBase, 'delay-[220ms] border-t border-border'].join(' ')}
        >
          {(notices ?? []).slice(0, 3).map((n) => (
            <article
              key={`${n.date}-${n.title}`}
              className="border-b border-border-lt py-7"
            >
              <div className="mb-2 flex flex-wrap items-baseline gap-3">
                <time className="font-en text-[0.68rem] font-light tracking-[0.18em] text-text-lt">
                  {n.date}
                </time>
                <h3 className="font-ja text-[0.92rem] font-light tracking-[0.08em] text-text">
                  {n.title}
                </h3>
              </div>

              <p className="text-[0.78rem] font-light leading-[2.0] tracking-[0.06em] text-text-mid">
                {n.body}
              </p>
            </article>
          ))}

          <div className="pt-8">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-4 font-ja text-[0.72rem] font-light tracking-[0.18em] text-text-mid hover:text-text"
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