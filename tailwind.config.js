const path = require('path');
const colors = require('tailwindcss/colors');
const generatePalette = require(path.resolve(__dirname, 'src/styles/tailwind/utils/generate-palette'));

const customPalettes = {
  primary: generatePalette('#508c3c'),
  secondary: generatePalette('#a4c73b')
};

const themes = {
  default: {
    primary: {
      ...customPalettes.primary,
      DEFAULT: customPalettes.primary[600]
    },
    secondary: {
      ...customPalettes.secondary,
      DEFAULT: customPalettes.secondary[600]
    },
    warn: {
      ...colors.red,
      DEFAULT: colors.red[600]
    },
    'on-warn': {
      500: colors.red['50']
    }
  }
};

/**
 * Tailwind configuration
 */
const config = {
  darkMode: 'class',
  content: ['./src/**/*.{html,scss,ts}'],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif']
      }
    }
  },

  plugins: [
    require(path.resolve(__dirname, 'src/styles/tailwind/plugins/utilities')),
    require(path.resolve(__dirname, 'src/styles/tailwind/plugins/icon-size')),
    require(path.resolve(__dirname, 'src/styles/tailwind/plugins/theming'))({
      themes
    })
  ]
};

module.exports = config;
