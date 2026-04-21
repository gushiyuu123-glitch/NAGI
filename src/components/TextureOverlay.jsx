// src/components/TextureOverlay.jsx
export default function TextureOverlay({
  src,
  opacity = 0.08,
  blend = 'multiply', // multiply / soft-light / overlay（基本はmultiply）
  position = 'center',
  size = 'cover',
  className = '',
}) {
  return (
    <div
      aria-hidden
      className={[
        'pointer-events-none absolute inset-0',
        className,
      ].join(' ')}
      style={{
        opacity,
        mixBlendMode: blend,
        backgroundImage: `url('${src}')`,
        backgroundPosition: position,
        backgroundSize: size,
        backgroundRepeat: 'no-repeat',
      }}
    />
  )
}