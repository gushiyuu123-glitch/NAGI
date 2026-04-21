// src/sections/AccessSection.jsx
import { accessRows } from '../data/siteData'
import useReveal from '../hooks/useReveal'
import TextureOverlay from '../components/TextureOverlay'

function nl2br(text = '') {
  return text.split('\n').map((line, index, arr) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < arr.length - 1 && <br />}
    </span>
  ))
}

const MAP_QUERY = '沖縄県那覇市○○ 1-2-3'
const mapUrl =
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(MAP_QUERY)

const mapImage = '/images/access-shop.png'

const revealBase =
  'translate-y-[18px] scale-[0.995] opacity-0 will-change-transform ' +
  'transition-[opacity,transform] duration-quiet ease-quiet ' +
  'motion-safe:data-[revealed=true]:translate-y-0 motion-safe:data-[revealed=true]:scale-100 motion-safe:data-[revealed=true]:opacity-100'

export default function AccessSection() {
  const labelRef = useReveal()
  const headingRef = useReveal()
  const tableRef = useReveal()
  const mapRef = useReveal()

  return (
    <section
      id="access"
      className="relative overflow-hidden bg-bg px-side py-[clamp(140px,16vw,220px)]"
    >
      {/* 気配だけ（任意） */}
      <TextureOverlay
        src="/textures/palm-shadow.webp"
        opacity={0.045}
        blend="multiply"
        position="center"
        className="scale-[1.06]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(248,245,240,0.92) 0%, rgba(248,245,240,0.72) 55%, rgba(248,245,240,0.92) 100%)',
        }}
      />

      <div className="relative z-[1] mx-auto grid max-w-site grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Left */}
        <div>
          <p
            ref={labelRef}
            className={[
              revealBase,
              'mb-4 inline-flex items-center gap-3.5 uppercase tracking-quiet-xl text-gold',
            ].join(' ')}
          >
            <span className="font-en text-micro">ACCESS</span>
            <span className="h-px w-7 bg-gold/45" />
          </p>

          <h2
            ref={headingRef}
            className={[
              revealBase,
              'mb-12 delay-100 font-ja text-[clamp(1.4rem,2.5vw,2rem)] font-extralight tracking-[0.1em] text-text',
            ].join(' ')}
          >
            アクセス
          </h2>

          <table
            ref={tableRef}
            className={[revealBase, 'delay-[220ms] w-full border-collapse'].join(' ')}
          >
            <tbody>
              {accessRows.map((row) => (
                <tr key={row.label} className="border-b border-border-lt">
                  <td className="w-[90px] whitespace-nowrap py-[15px] pr-5 align-top text-[0.8rem] font-light leading-[1.9] tracking-[0.08em] text-text-lt">
                    {row.label}
                  </td>
                  <td className="py-[15px] align-top text-[0.8rem] font-light leading-[1.9] tracking-[0.08em] text-text-mid">
                    {nl2br(row.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right / Map */}
        <a
          ref={mapRef}
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="店舗の場所をGoogle Mapsで開く"
          className={[
            revealBase,
            'delay-100',
            'group relative block aspect-[4/3] overflow-hidden',
            'border border-border bg-surface',
          ].join(' ')}
        >
          <img
            src={mapImage}
            alt="店舗外観"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-quiet group-hover:scale-[1.02]"
            style={{ filter: 'saturate(0.92) brightness(1.03) contrast(1.04)' }}
          />

          {/* 全体の締め */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(24,19,14,0.05),rgba(24,19,14,0.22))]" />

          {/* うっすい鈍金の気配 */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(176,144,96,0.06) 0%, transparent 70%)',
            }}
          />

          {/* Top badge（角丸なし） */}
          <div className="absolute left-5 top-5 border border-white/18 bg-white/10 px-3 py-[8px] backdrop-blur-[6px]">
            <span className="font-en text-[0.58rem] font-light tracking-[0.24em] text-white/85">
              GOOGLE MAPS
            </span>
          </div>

          {/* Bottom copy */}
          <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(18,15,12,0.62),rgba(18,15,12,0.00))] px-7 pb-7 pt-12">
            <p className="font-ja text-[1rem] font-light tracking-[0.08em] text-white/92">
              店舗外観を見る
            </p>
            <p className="mt-2 font-ja text-[0.72rem] font-light leading-[1.9] tracking-[0.08em] text-white/70">
              クリックで Google Maps を開きます
            </p>
          </div>
        </a>
      </div>
    </section>
  )
}