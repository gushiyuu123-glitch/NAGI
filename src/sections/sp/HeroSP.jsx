// src/sections/sp/HeroSP.jsx
import { useMemo, useState } from 'react'
import Reveal from '../../components/Reveal'
import './heroSP.css'

function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  startDelay = 0.18,
  step = 0.048,
  ariaLabel,
}) {
  const chars = useMemo(() => Array.from(text), [text])

  return (
    <Tag className={`split ${className}`} aria-label={ariaLabel ?? text}>
      {chars.map((ch, i) => (
        <span
          key={`c-${i}`}
          aria-hidden="true"
          className="split-char"
          style={{ '--d': `${startDelay + i * step}s` }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </Tag>
  )
}

export default function HeroSP() {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <section id="hero" className="hero-sp">
      <img
        className="hero-sp__img"
        src="/images/hero.png"
        alt="NAGI タイ古式マッサージの施術空間"
        loading="eager"
        decoding="async"
        fetchpriority="high"
        draggable={false}
        onLoad={() => setImgLoaded(true)}
        style={{
          opacity: imgLoaded ? 1 : 0,
          transform: imgLoaded ? 'scale(1)' : 'scale(1.02)',
          transition:
            'opacity 1.55s cubic-bezier(0.22,0.1,0.28,1), transform 2.15s cubic-bezier(0.22,0.1,0.28,1)',
          willChange: 'opacity, transform',
        }}
      />

      {/* ほぼ存在しない暗幕（SPは“やりすぎない”） */}
      <div className="hero-sp__depth" aria-hidden />
      <div className="hero-sp__topshade" aria-hidden />

      {/* 英字＝object（SPは弱く・小さめ） */}
      <div className="hero-sp__object" aria-hidden>
        GIFT
      </div>

      {/* ===== Center Copy ===== */}
      <div className="hero-sp__center">
        <div className="hero-sp__copy">
          <Reveal as="p" immediate className="hero-sp__tag" delay={0.06}>
            NAHA — THAI TRADITIONAL MASSAGE
          </Reveal>

          <h1 className="hero-sp__h1">
            <SplitText
              text="旅の疲れに、"
              className="hero-sp__sm"
              startDelay={0.18}
              step={0.055}
              ariaLabel="旅の疲れに、"
            />
            <SplitText
              text="静かな癒しを贈る。"
              className="hero-sp__lg"
              startDelay={0.46}
              step={0.05}
              ariaLabel="静かな癒しを贈る。"
            />
          </h1>

          <SplitText
            text="A quiet gift."
            as="p"
            className="hero-sp__sub"
            startDelay={0.98}
            step={0.03}
            ariaLabel="A quiet gift."
          />
        </div>

        {/* ✅ CTA：下に独立（safe-area考慮） */}
        <div className="hero-sp__cta">
          <Reveal
            as="a"
            immediate
            href="#treatment"
            className="hero-sp__ctaLink hero-cta-soft"
            delay={1.18}
          >
            施術を見る
          </Reveal>
        </div>
      </div>
    </section>
  )
}