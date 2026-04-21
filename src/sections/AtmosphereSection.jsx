import useReveal from '../hooks/useReveal'
import TextureOverlay from '../components/TextureOverlay'

export default function AtmosphereSection() {
  const imgRef = useReveal()
  const quoteRef = useReveal()
  const enRef = useReveal()

  return (
    <section id="atmos" className="relative flex min-h-[72svh] overflow-hidden">
      {/* SPでも“気配だけ”残す（任意） */}
      <div className="pointer-events-none absolute inset-0 lg:hidden">
        <TextureOverlay
          src="/textures/thai-silk.webp"
          opacity={0.06}
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
      </div>

      {/* ── 左: 画像（PC） ── */}
      <div className="relative hidden w-[48%] lg:block">
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
            ease-[cubic-bezier(0.22,0.1,0.28,1)]
            data-[revealed=true]:opacity-100 data-[revealed=true]:scale-100
          "
          style={{
            // ✅ 太陽感が出やすい位置へ微調整（必要なら数値だけ触る）
            objectPosition: '52% 46%',
          }}
        />

        {/* 右端フェード + 上下締め（統合） */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(to right, transparent 55%, #F2EDE4 100%),
              linear-gradient(to bottom, rgba(6,4,2,0.18) 0%, transparent 20%),
              linear-gradient(to top,    rgba(6,4,2,0.18) 0%, transparent 20%)
            `,
          }}
        />

        {/* ✅ 太陽ベール（“陽だまりの気配”だけ足す） */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            // ここが太陽感の本体：強すぎたら opacity を下げる
            background: `
              radial-gradient(circle at 18% 22%, rgba(255, 238, 204, 0.26), transparent 52%),
              radial-gradient(circle at 30% 60%, rgba(255, 226, 170, 0.12), transparent 58%)
            `,
            mixBlendMode: 'screen',
            opacity: 0.85,
          }}
        />

        {/* ✅ “光が差す”方向性（薄い斜光） */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(115deg, rgba(255, 235, 200, 0.10) 0%, transparent 45%)',
            opacity: 0.75,
          }}
        />
      </div>

      {/* ── 右: テキスト ── */}
      <div
        className="
          relative z-[1] flex flex-1 flex-col justify-center
          bg-[linear-gradient(160deg,#F2EDE4_0%,#EDE7DC_100%)]
          px-[clamp(40px,6vw,88px)] py-24
        "
      >
        {/* うっすい質感（余韻） */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <TextureOverlay
            src="/textures/thai-silk.webp"
            opacity={0.045}
            blend="multiply"
            position="center"
            className="scale-[1.05]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(160deg, rgba(242,237,228,0.78) 0%, rgba(237,231,220,0.90) 100%)',
            }}
          />
        </div>

        {/* ✅ テキスト側にも“あたたかさ”を微量だけ回す（やりすぎ注意） */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              'radial-gradient(circle at 12% 38%, rgba(255, 238, 204, 0.10), transparent 52%)',
            opacity: 0.9,
          }}
        />

        <div className="relative z-[1]">
          <span className="mb-10 block h-px w-8 bg-gold/45" />

          <p
            ref={quoteRef}
            className="
              mb-8 font-ja text-[clamp(1.1rem,1.8vw,1.4rem)] font-extralight
              leading-[2.15] tracking-[0.16em] text-text
              opacity-0 translate-y-[18px] scale-[0.995]
              transition-[opacity,transform] duration-quiet delay-[200ms] ease-quiet
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
              font-en text-[0.78rem] font-light italic
              tracking-[0.2em] text-text-mid
              opacity-0 translate-y-[18px] scale-[0.995]
              transition-[opacity,transform] duration-quiet delay-[400ms] ease-quiet
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