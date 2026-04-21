// src/sections/sp/AtmosphereSectionSP.jsx
import useReveal from '../../hooks/useReveal'
import TextureOverlay from '../../components/TextureOverlay'

export default function AtmosphereSectionSP() {
  const imgRef = useReveal()
  const quoteRef = useReveal()
  const enRef = useReveal()

  return (
    <section id="atmos" className="relative overflow-hidden bg-bg-warm">
      {/* ===== 上：写真（太陽感は“ベール”で） ===== */}
      <div className="relative h-[46svh] min-h-[320px] w-full overflow-hidden">
        <img
          ref={imgRef}
          src="/images/atmos.png"
          alt=""
          loading="lazy"
          decoding="async"
          className="
            absolute inset-0 h-full w-full object-cover
            opacity-0 scale-[1.03]
            transition-[opacity,transform] duration-[1600ms]
            ease-quiet
            data-[revealed=true]:opacity-100 data-[revealed=true]:scale-100
          "
          style={{
            objectPosition: '52% 46%',
          }}
        />

        {/* 文字側に繋げるための“下フェード” */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom,
                rgba(6,4,2,0.10) 0%,
                rgba(6,4,2,0.06) 32%,
                rgba(6,4,2,0.20) 72%,
                rgba(242,237,228,0.98) 100%
              )
            `,
          }}
        />

        {/* ✅ 太陽ベール（強くしない） */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 18% 22%, rgba(255,238,204,0.22), transparent 52%),
              radial-gradient(circle at 32% 62%, rgba(255,226,170,0.10), transparent 58%),
              linear-gradient(115deg, rgba(255,235,200,0.08) 0%, transparent 45%)
            `,
            mixBlendMode: 'screen',
            opacity: 0.85,
          }}
        />
      </div>

      {/* ===== 下：テキスト（静かな回復の“余韻”） ===== */}
      <div className="relative px-[18px] py-[clamp(84px,12vw,120px)]">
        {/* 質感（気配） */}
        <div className="pointer-events-none absolute inset-0">
          <TextureOverlay
            src="/textures/thai-silk.webp"
            opacity={0.05}
            blend="multiply"
            position="center"
            className="scale-[1.06]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(160deg, rgba(242,237,228,0.92) 0%, rgba(237,231,220,0.96) 100%)',
            }}
          />
          {/* 文字の安心感だけ少し補助（光膜） */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 16% 22%, rgba(255,238,204,0.10), transparent 55%)',
              opacity: 0.9,
            }}
          />
        </div>

        <div className="relative z-[1]">
          {/* ゴールドライン */}
          <span className="mb-9 block h-px w-8 bg-gold/45" />

          <p
            ref={quoteRef}
            className="
              mb-7
              font-ja text-[1.08rem] font-extralight
              leading-[2.1] tracking-[0.14em] text-text
              opacity-0 translate-y-[18px] scale-[0.995]
              transition-[opacity,transform] duration-[1050ms] delay-[160ms]
              ease-quiet
              data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 data-[revealed=true]:scale-100
            "
          >
            施術後、お客様はよく<br />
            「呼吸が深くなった気がする」<br />
            とおっしゃいます。
          </p>

          <p
            ref={enRef}
            className="
              font-en text-[0.74rem] font-light italic
              tracking-[0.2em] text-text-mid
              opacity-0 translate-y-[18px] scale-[0.995]
              transition-[opacity,transform] duration-[1050ms] delay-[320ms]
              ease-quiet
              data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0 data-[revealed=true]:scale-100
            "
          >
            &ldquo;A quieter body. A quieter mind.&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}