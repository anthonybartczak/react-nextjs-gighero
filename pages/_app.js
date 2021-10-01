import 'tailwindcss/tailwind.css'
import '../styles/main.css';
import { ChakraProvider } from "@chakra-ui/react"
import 'focus-visible/dist/focus-visible'
import extendedTheme from '../pages/theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={extendedTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
