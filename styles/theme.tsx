// 1. Import the extendTheme function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
// import { withProse } from '@nikolovlazar/chakra-ui-prose';
import type { ComponentStyleConfig } from '@chakra-ui/theme';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    50: '#ffefeb',
    100: '#FEDED6',
    200: '#FEB7AE',
    300: '#FE8786',
    400: '#FD6874',
    500: '#FD3659',
    600: '#D92757',
    700: '#B61B53',
    800: '#92114C',
    900: '#790A47',
  },

  // Tailwind neutral grey
  gray: {
    50: '#F7FAFC',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Custom
  dark: {
    50: '#383838',
    100: '#363636',
    200: '#333333',
    300: '#2E2E2E',
    400: '#2C2C2C',
    500: '#272727',
    600: '#252525',
    700: '#232323',
    800: '#1E1E1E',
    900: '#121212',
  },
};

// color mode config
const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const fonts = {
  heading: 'Space Grotesk', // weight 300 -> 700
  body: 'Inter', // weight 100 -> 900
  mono: 'SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
};

const shadows = {
  // Brand
  smFlatBrand: '0px 0px 20px -3px rgba(253,54,89,0.75)',
  xlFlatBrand: '0px 0px 20px 0px rgba(253,54,89,0.75)',
  // White
  xsWhite: '0 0 0 1px rgba(255, 255, 255, 0.05)',
  smWhite: '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
  baseWhite: '0 1px 3px 0 rgba(255,255,255, 0.1),0 1px 2px 0 rgba(255,255,255, 0.06)',
  mdWhite: '0 4px 6px -1px rgba(255, 255, 255, 0.1),0 2px 4px -1px rgba(255, 255, 255, 0.06)',
  lgWhite: '0 10px 15px -3px rgba(255, 255, 255, 0.1),0 4px 6px -2px rgba(255, 255, 255, 0.05)',
  xlWhite: '0 20px 25px -5px rgba(255, 255, 255, 0.1),0 10px 10px -5px rgba(255, 255, 255, 0.04)',
  '2xlWhite': '0 25px 50px -12px rgba(255, 255, 255, 0.25)',
};

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
const Heading: ComponentStyleConfig = {
  variants: {
    gradient: {
      bgGradient: 'linear(to-l, brand.500,#FF0080)',
      backgroundClip: 'text',
    },
  },
};

export const containerProps = {
  m: '0 auto',
  maxW: '3xl',
  px: { base: 6, lg: 0 },
  w: 'full',
};

const themeMode = (colorMode: 'light' | 'dark', lightValue: any, darkValue: any) => {
  return colorMode === 'light' ? lightValue : darkValue;
};

const Button: ComponentStyleConfig = {
  variants: {
    glow: {
      color: 'white',
      bgColor: 'brand.500',
      shadow: 'smFlatBrand',
      _hover: {
        shadow: 'xlFlatBrand',
        bgColor: 'brand.600',
      },
      _active: {
        bgColor: 'brand.700',
      },
    },
    secondary: {
      color: 'white',
      bgColor: 'dark.200',
      _hover: {
        bgColor: 'dark.900',
      },
      _active: {
        bgColor: 'dark.50',
      },
    },
    navlink: ({ colorMode }) => ({
      color: themeMode(colorMode, 'gray.800', 'whiteAlpha.900'),
      bgColor: 'transparent',
      rounded: 'md',
      h: 8,
      p: 3,
      _hover: {
        bgColor: themeMode(colorMode, 'blackAlpha.200', 'whiteAlpha.300'),
      },
      _active: {
        bgColor: themeMode(colorMode, 'blackAlpha.50', 'whiteAlpha.400'),
      },
    }),
    'navlink-current': ({ colorMode }) => ({
      color: themeMode(colorMode, 'brand.500', 'white'),
      bgColor: themeMode(colorMode, 'brand.50', 'brand.500'),
      rounded: 'md',
      h: 8,
      p: 3,
      _hover: {
        bgColor: themeMode(colorMode, 'brand.100', 'brand.600'),
      },
      _active: {
        bgColor: themeMode(colorMode, 'brand.50', 'brand.700'),
      },
    }),
  },
};

const styles = {
  global: (props: object) => ({
    html: {
      scrollBehavior: 'smooth',
    },
    body: {
      color: mode('gray.900', 'whiteAlpha.800')(props),
      bg: mode('white', 'dark.900')(props),
    },
    '#__next': {
      minH: '100vh',
      pb: 20,
    },
  }),
};

const theme = extendTheme(
  {
    colors,
    styles,
    config,
    fonts,
    shadows,
    components: {
      Heading,
      Button,
    },
  },
  // withProse(),
);

export default theme;
