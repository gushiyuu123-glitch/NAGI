// src/components/Reveal.jsx
import { useEffect, useRef, useState } from 'react'

export default function Reveal({
  as: Tag = 'div',
  className = '',
  children,
  delay = 0,
  immediate = false,
  style,
  // 追加オプション（必要なければ触らなくてOK）
  threshold = 0.1,
  rootMargin = '0px 0px -48px 0px',
  baseDelayMs = 400, // immediate時の“呼吸”待ち
  once = true,
  ...props
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

    // motion off の人は即表示
    if (reduce) {
      setIsVisible(true)
      return
    }

    let timerId
    let observer

    // すでに表示済みなら何もしない
    if (isVisible) return

    if (immediate) {
      // ✅ immediate の遅延は setTimeout 側だけ
      timerId = window.setTimeout(() => {
        setIsVisible(true)
      }, baseDelayMs + delay * 1000)

      return () => window.clearTimeout(timerId)
    }

    const node = ref.current
    if (!node) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)

    return () => {
      if (timerId) window.clearTimeout(timerId)
      if (observer) observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, immediate, threshold, rootMargin, baseDelayMs, once, isVisible])

  // ✅ immediate のときは delay を “setTimeout側だけ” に寄せる（遅延二重を防ぐ）
  const transitionDelay = immediate ? '0s' : `${delay}s`

  return (
    <Tag
      ref={ref}
      className={`aq-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay, ...style }}
      {...props}
    >
      {children}
    </Tag>
  )
}