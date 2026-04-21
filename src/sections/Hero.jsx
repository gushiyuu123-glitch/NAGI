// src/sections/Hero.jsx
import { useMemo, useState } from 'react'
import Reveal from '../components/Reveal'
import './hero.css'

function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  startDelay = 0.18,
  step = 0.05,
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

export default function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <section id="hero" className="hero">
      <img
        className="hero-img"
        src="/images/hero.png"
        alt="NAGI タイ古式マッサージの施術空間"
        loading="eager"
        decoding="async"
        fetchpriority="high"
        draggable={false}
        onLoad={() => setImgLoaded(true)}
        style={{
          opacity: imgLoaded ? 1 : 0,
          transform: imgLoaded ? 'scale(1)' : 'scale(1.018)',
          transition:
            'opacity 1.55s cubic-bezier(0.22,0.1,0.28,1), transform 2.15s cubic-bezier(0.22,0.1,0.28,1)',
          willChange: 'opacity, transform',
        }}
      />

      {/* ほぼ存在しない暗幕（“あと0.5段だけ”締める） */}
      <div className="hero-depth" aria-hidden />
      <div className="hero-topshade" aria-hidden />

      {/* 英字＝object（意味は読ませない） */}
      <div className="hero-object" aria-hidden>
        GIFT
      </div>

      {/* ===== Center ===== */}
      <div className="hero-center">
        <div className="hero-center-copy">
          <Reveal as="p" immediate className="hero-tag" delay={0.06}>
            NAHA — THAI TRADITIONAL MASSAGE
          </Reveal>

          <h1 className="hero-h1">
            <SplitText
              text="旅の疲れに、"
              className="hero-title-sm"
              startDelay={0.18}
              step={0.055}
              ariaLabel="旅の疲れに、"
            />
            <SplitText
              text="静かな癒しを贈る。"
              className="hero-title-lg"
              startDelay={0.46}
              step={0.05}
              ariaLabel="静かな癒しを贈る。"
            />
          </h1>

          {/* これは“意味”じゃなく、質感だけ */}
          <SplitText
            text="A quiet gift."
            as="p"
            className="hero-sub"
            startDelay={0.98}
            step={0.03}
            ariaLabel="A quiet gift."
          />
        </div>

        {/* CTAは“下に離して独立”（しゅぱーん対策はCSSで） */}
        <div className="hero-center-cta">
          <Reveal
            as="a"
            immediate
            href="#treatment"
            className="hero-cta hero-cta-soft"
            delay={1.18}
          >
            施術を見る
          </Reveal>
        </div>
      </div>

      <span className="hero-scroll" aria-hidden>
        SCROLL
      </span>
    </section>
  )
}