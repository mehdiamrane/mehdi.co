// 1. Import the extendTheme function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { withProse } from '@nikolovlazar/chakra-ui-prose';

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
  useSystemColorMode: false,
};

const styles = {
  global: (props: object) => ({
    // html: {
    //   scrollBehavior: "smooth",
    // },
    body: {
      color: mode('gray.800', 'whiteAlpha.800')(props),
      bg: mode('white', 'dark.900')(props),
    },
  }),
};

const theme = extendTheme({ colors, styles, config }, withProse());

export default theme;
