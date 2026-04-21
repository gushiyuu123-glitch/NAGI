/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      /* =========================
         Colors (design system)
      ========================= */
      colors: {
        bg: '#F8F5F0',
        'bg-warm': '#F2EDE4',
        surface: '#EDE7DC',
        border: '#D8D1C4',
        'border-lt': '#E5DED3',
        wood: '#8B6A52',
        olive: '#6A6A5A',
        gold: '#B09060',
        text: '#252118',
        'text-mid': '#6B6055',
        'text-lt': '#A09488',
        whiteish: '#FDFCFA',
      },

      /* =========================
         Type
      ========================= */
      fontFamily: {
        ja: ['"Noto Serif JP"', 'serif'],
        en: ['"Cormorant Garamond"', 'serif'],
      },
      fontSize: {
        micro: ['0.58rem', { lineHeight: '1.35' }], // hero-tag / small labels
        cap: ['0.68rem', { lineHeight: '1.35' }],   // nav / caps
      },
      letterSpacing: {
        'quiet-xl': '0.4em',
      },

      /* =========================
         Layout tokens
      ========================= */
      maxWidth: {
        site: '1200px',
        content: '880px',
      },
      spacing: {
        side: 'clamp(40px, 6vw, 100px)',        // px-side
        'section-y': 'clamp(80px, 12vh, 160px)', // section padding baseline
      },

      /* =========================
         Motion (your “quiet” system)
      ========================= */
      transitionTimingFunction: {
        quiet: 'cubic-bezier(0.22, 0.1, 0.28, 1)',
      },
      transitionDuration: {
        quiet: '1050ms', // aq-fade基準
        slow: '1800ms',  // hero image opacity
        still: '2400ms', // hero image scale
      },

      /* =========================
         Subtle UI depth (non-flashy)
      ========================= */
      boxShadow: {
        hair: '0 1px 0 rgba(216,209,196,0.35)',
        soft: '0 8px 28px rgba(30,22,12,0.06)',
        nav: '0 1px 0 rgba(216,209,196,0.25), 0 4px 20px rgba(30,22,12,0.05)',
      },
      borderRadius: {
        quiet: '18px',
        'quiet-xl': '24px',
      },

      /* =========================
         Background helpers (optional)
      ========================= */
      backgroundImage: {
        // うっすい光膜（“黒ベタ待ち”の緩和とか、セクションの空気足しに）
        'veil-warm':
          'radial-gradient(circle at 78% 22%, rgba(255,255,255,0.10), transparent 28%)',
      },
    },
  },

  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        /* scrollbarを消す（SP横スクロールなど） */
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },

        /* タップ時の青ハイライト抑制（UIの品を保つ） */
        '.tap-transparent': {
          '-webkit-tap-highlight-color': 'transparent',
        },

        /* 微細アニメでのチラつき抑制 */
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
      })
    }),
  ],
}