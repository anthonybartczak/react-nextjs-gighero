import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { gql, useQuery, useMutation, InMemoryCache } from '@apollo/client'
import { offsetLimitPagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: offsetLimitPagination(),
      },
    },
  },
});

const AllBandPostsQuery = gql`
  query allBandPostsQuery($first: Int, $after: String) {
    bandPosts(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          imageUrl
          title
          tags
          content
          id
        }
      }
    }
  }
`;

export default function Home() {
  const { loading, data, error, fetchMore } = useQuery(AllBandPostsQuery, {
    variables: { first: 2 },
  });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  const { endCursor, hasNextPage } = data.bandPosts.pageInfo;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <main>
      <div className="container mx-auto max-w-5xl my-20">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.bandPosts.edges.map(({ node })=> (
            <li key={node.id} className="shadow  max-w-md  rounded">
              <div className="p-5 flex flex-col space-y-2">
              <p className="text-sm text-blue-500">{node.tags}</p>
                <p className="text-lg font-medium">{node.title}</p>
                <p className="text-gray-600">{node.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {hasNextPage ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded my-10"
            onClick={() => {
              fetchMore({
                variables: { after: endCursor },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  fetchMoreResult.bandPosts.edges = [
                    ...prevResult.bandPosts.edges,
                    ...fetchMoreResult.bandPosts.edges,
                  ];
                  return fetchMoreResult;
                },
              });
            }}
          >
            more
          </button>
        ) : (
          <p className="my-10 text-center font-medium">
            You&apos;ve reached the end!{" "}
          </p>
        )}
      </main>
      <footer>
      </footer>
    </div>
  )
}
