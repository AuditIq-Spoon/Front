/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // AuditIQ Design System — Dark Mode OLED
        primary:     '#0F172A',
        secondary:   '#1E293B',
        accent:      '#22C55E',
        'accent-hover': '#16A34A',
        background:  '#020617',
        foreground:  '#F8FAFC',
        muted:       '#1A1E2F',
        border:      '#334155',
        destructive: '#EF4444',
        ring:        '#0F172A',
        // Risk score color scale
        'risk-safe':     '#22C55E',
        'risk-low':      '#84CC16',
        'risk-medium':   '#F59E0B',
        'risk-high':     '#F97316',
        'risk-critical': '#EF4444',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        xs:   ['12px', { lineHeight: '16px' }],
        sm:   ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg:   ['18px', { lineHeight: '28px' }],
        xl:   ['20px', { lineHeight: '28px' }],
        '2xl':['24px', { lineHeight: '32px' }],
        '3xl':['30px', { lineHeight: '36px' }],
        '4xl':['36px', { lineHeight: '40px' }],
      },
      spacing: {
        // 4pt / 8pt grid
        '4.5': '18px',
        '18':  '72px',
        '22':  '88px',
      },
      borderRadius: {
        'sm':  '4px',
        DEFAULT: '8px',
        'md':  '8px',
        'lg':  '12px',
        'xl':  '16px',
        '2xl': '20px',
      },
      boxShadow: {
        'glow-accent': '0 0 20px 0 rgba(34, 197, 94, 0.25)',
        'glow-red':    '0 0 20px 0 rgba(239, 68, 68, 0.25)',
        'card':        '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
        'card-hover':  '0 4px 12px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in':      'fadeIn 200ms ease-out',
        'slide-up':     'slideUp 250ms ease-out',
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'progress-bar': 'progressBar 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        progressBar: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' },
        },
      },
      transitionTimingFunction: {
        'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
