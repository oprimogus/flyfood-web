import type { Config } from "tailwindcss"
import daisyui from "daisyui"

const colorPalette = {
  // Cores principais - Laranja vibrante para CTAs
  primary: '#F42C04',
  primaryContent: '#FDFFFC',
  primaryFocus: '#f44826',

  // Vermelho escuro para elementos secundários
  secondary: '#66101F',
  secondaryContent: '#FDFFFC',
  secondaryFocus: '#551019',

  // Amarelo/Dourado para destaques/promoções
  accent: '#E6AF2E',
  accentContent: '#011627',
  accentFocus: '#d9a425',

  // Azul escuro para elementos neutros
  neutral: '#011627',
  neutralContent: '#FDFFFC',
  neutralFocus: '#011220',

  // Cores de background - usando o branco como base
  base100: '#FDFFFC',
  base200: '#f5f7f6',
  base300: '#e8eae9',
  baseContent: '#011627',

  // Cores de estado
  success: '#2ECC71',
  successContent: '#FDFFFC',
  warning: '#E6AF2E',
  warningContent: '#011627',
  error: '#F55D3E',
  errorContent: '#FDFFFC',
  info: '#66101F',
  infoContent: '#FDFFFC',

  // Cores de interface
  border: '#e8eae9',
  borderHover: '#d1d3d2',
  ring: '#F55D3E',
  disabled: '#95979c',
  placeholder: '#95979c',

  // Cores de sobreposição
  overlay: 'rgba(1, 22, 39, 0.5)', // Usando o azul escuro
  shadow: 'rgba(1, 22, 39, 0.1)',
} as const

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores principais
        primary: {
          DEFAULT: colorPalette.primary,
          content: colorPalette.primaryContent,
          focus: colorPalette.primaryFocus,
        },
        secondary: {
          DEFAULT: colorPalette.secondary,
          content: colorPalette.secondaryContent,
          focus: colorPalette.secondaryFocus,
        },
        accent: {
          DEFAULT: colorPalette.accent,
          content: colorPalette.accentContent,
          focus: colorPalette.accentFocus,
        },
        neutral: {
          DEFAULT: colorPalette.neutral,
          content: colorPalette.neutralContent,
          focus: colorPalette.neutralFocus,
        },
        // Estados
        success: {
          DEFAULT: colorPalette.success,
          content: colorPalette.successContent,
        },
        warning: {
          DEFAULT: colorPalette.warning,
          content: colorPalette.warningContent,
        },
        error: {
          DEFAULT: colorPalette.error,
          content: colorPalette.errorContent,
        },
        info: {
          DEFAULT: colorPalette.info,
          content: colorPalette.infoContent,
        },
        // Base/Background
        base: {
          100: colorPalette.base100,
          200: colorPalette.base200,
          300: colorPalette.base300,
          content: colorPalette.baseContent,
        },
        // Interface
        border: {
          DEFAULT: colorPalette.border,
          hover: colorPalette.borderHover,
        },
        ring: colorPalette.ring,
        disabled: colorPalette.disabled,
        placeholder: colorPalette.placeholder,
        overlay: colorPalette.overlay,
        shadow: colorPalette.shadow,
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
  // daisyui: {
  //   themes: [
  //     {
  //       firstTheme: {
  //         // Cores principais
  //         primary: colorPalette.primary,
  //         "primary-content": colorPalette.primaryContent,
  //         "primary-focus": colorPalette.primaryFocus,
          
  //         secondary: colorPalette.secondary,
  //         "secondary-content": colorPalette.secondaryContent,
  //         "secondary-focus": colorPalette.secondaryFocus,
          
  //         accent: colorPalette.accent,
  //         "accent-content": colorPalette.accentContent,
  //         "accent-focus": colorPalette.accentFocus,
          
  //         // Cores neutras
  //         neutral: colorPalette.neutral,
  //         "neutral-content": colorPalette.neutralContent,
  //         "neutral-focus": colorPalette.neutralFocus,
          
  //         // Cores de background
  //         "base-100": colorPalette.base100,
  //         "base-200": colorPalette.base200,
  //         "base-300": colorPalette.base300,
  //         "base-content": colorPalette.baseContent,
          
  //         // Estados
  //         success: colorPalette.success,
  //         "success-content": colorPalette.successContent,
  //         warning: colorPalette.warning,
  //         "warning-content": colorPalette.warningContent,
  //         error: colorPalette.error,
  //         "error-content": colorPalette.errorContent,
  //         info: colorPalette.info,
  //         "info-content": colorPalette.infoContent,
          
  //         // Interface
  //         bordered: colorPalette.border,
  //         "bordered-hover": colorPalette.borderHover,
  //         ring: colorPalette.ring,
  //         disabled: colorPalette.disabled,
  //         placeholder: colorPalette.placeholder,
  //       },
  //     },
  //   ],
  //   darkTheme: "dark",
  //   base: true,
  //   styled: true,
  //   utils: true,
  //   prefix: "",
  //   logs: true,
  //   themeRoot: ":root",
  // },
} satisfies Config

export default config

