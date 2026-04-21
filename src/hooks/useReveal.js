import { useEffect, useRef } from 'react'

export default function useReveal({
  threshold = 0.12,
  rootMargin = '0px 0px -48px 0px',
  once = true,
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        node.dataset.revealed = 'true'

        if (once) {
          observer.unobserve(node)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return ref
}