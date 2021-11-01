import { ApolloClient, InMemoryCache } from '@apollo/client';
//import { offsetLimitPagination } from '@apollo/client/utilities';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      PostQuery: {
        fields: {
          posts: {
            keyArgs: false,
          },
          // tags: {
          //   keyArgs: false,
          // }
        },
      },
      TagQuery: {
        fields: {
          tags: {
            keyArgs: false,
          },
        },
      },
    },
  })
});

export default apolloClient;