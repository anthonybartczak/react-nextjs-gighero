import { ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      AllBandPostsQuery: {
        fields: {
          bandPosts: offsetLimitPagination(),
        }
      }
    }
  })
});

export default apolloClient;