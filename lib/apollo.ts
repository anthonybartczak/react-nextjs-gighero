import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          tags: {
            keyArgs: false,
          },
          posts: {
            keyArgs: false,
          }
        }
      },
    },
  })
});

export default apolloClient;