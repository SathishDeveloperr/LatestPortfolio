/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Matched to the hero video's background so the video blends seamlessly
        brick: {
          DEFAULT: '#82322A', // hero base red (video edge tone)
          deep: '#5E211B',
          dark: '#471712',
        },
        ember: '#E8442E', // vivid CTA red
        flame: '#FF6A4D',
        ink: '#0B0A0A', // near-black sections
        coal: '#151212', // cards on dark
        smoke: '#211C1B', // borders on dark
        cream: '#FFF6F2', // warm off-white text
        sand: '#D9BEB6', // muted body text on dark/red
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
