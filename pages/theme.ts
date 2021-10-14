import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const colors = {
  keyLime: {
    900: '#d9ed92',
    800: '#ddef9d',
    700: '#e1f1a8',
    600: '#e4f2b3',
    500: '#e8f4be',
    400: '#ecf6c9',
    300: '#f0f8d3',
    200: '#f4fade',
    100: '#f7fbe9',
    50: '#fbfdf4',
  },
  yaleBlue: {
    900: '#184e77',
    800: '#2f6085',
    700: '#467192',
    600: '#5d83a0',
    500: '#7495ad',
    400: '#8ca7bb',
  },
  blueMunsell: {
    900: '#168aad',
    800: '#2d96b5',
    700: '#45a1bd',
    600: '#5cadc6',
    500: '#73b9ce',
    400: '#8bc5d6',
    300: '#a2d0de',
    200: '#b9dce6',
    100: '#d0e8ef',
    50: '#e8f3f7',
  }
}

const extendedTheme = extendTheme ({
    config,
    colors
})

export default extendedTheme