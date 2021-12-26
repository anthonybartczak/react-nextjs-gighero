import 'tailwindcss/tailwind.css'
import '../styles/main.css';
import { ChakraProvider } from "@chakra-ui/react"
import 'focus-visible/dist/focus-visible'
import extendedTheme from './theme'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../lib/apollo'
import { SessionProvider } from 'next-auth/react';


export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={extendedTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}