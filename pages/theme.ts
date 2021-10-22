import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

// Brand base color scheme
// #EFC164
// #F3835D
// #F35955
// #286275
// #00434C

const colors = {
  brandRed: {
    900: '#f35955',
    800: '#f46a66',
    700: '#f57a77',
    600: '#f78b88',
    500: '#f89b99',
    400: '#f9acaa',
    300: '#fabdbb',
    200: '#fbcdcc',
    100: '#fddedd',
    50: '#feeeee',
  },
  brandOrangeRed: {
    900: '#f3835d',
    800: '#f48f6d',
    700: '#f59c7d',
    600: '#f7a88e',
    500: '#f8b59e',
    400: '#f9c1ae',
    300: '#facdbe',
    200: '#fbdace',
    100: '#fde6df',
    50: '#fef3ef',
  },
  brandYellow: {
    900: '#efc164',
    800: '#f1c774',
    700: '#f2cd83',
    600: '#f4d493',
    500: '#f5daa2',
    400: '#f7e0b2',
    300: '#f9e6c1',
    200: '#faecd1',
    100: '#fcf3e0',
    50: '#fdf9f0',
  },
  brandBlue: {
    900: '#286275',
    800: '#3e7283',
    700: '#538191',
    600: '#69919e',
    500: '#7ea1ac',
    400: '#94b1ba',
    300: '#a9c0c8',
    200: '#bfd0d6',
    100: '#d4e0e3',
    50: '#eaeff1',
  },
  brandDarkBlue: {
    900: '#00434c',
    800: '#1a565e',
    700: '#336970',
    600: '#4d7b82',
    500: '#668e94',
    400: '#80a1a6',
    300: '#99b4b7',
    200: '#b3c7c9',
    100: '#ccd9db',
    50: '#e6eced',
  }
}

const extendedTheme = extendTheme ({
    config,
    colors
})

export default extendedTheme