import 'tailwindcss/tailwind.css'
import '../styles/main.css';
import { ChakraProvider } from "@chakra-ui/react"
import 'focus-visible/dist/focus-visible'
import extendedTheme from './theme'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'


export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={extendedTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}