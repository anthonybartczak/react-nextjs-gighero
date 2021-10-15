import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import { gql, useQuery } from '@apollo/client'
import Pagination from "@choc-ui/paginator";
import { Flex } from "@chakra-ui/react";

const AllBandPostsQuery = gql`
  query allBandPostsQuery($first: Int, $offset: Int) {
    bandPosts(first: $first, offset: $offset) {
      edges {
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
    variables: {
      first: 1,
      offset: 0
    },
  });
  
  function onPageChange(pageNumber: number): void {
    fetchMore({
      variables: {
        first: 1,
        offset: pageNumber - 1
      }
    });
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <main>
      <div className="container mx-auto max-w-6xl my-20">
        <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-5 place-items-center">
          {data?.bandPosts.edges.map(({ node }) => (
            <li key={node.id} className="shadow w-xl rounded">
              <div className="p-5 flex flex-col space-y-2">
              <Image
                src={node.imageUrl}
                alt="Picture of the author"
                width={500}
                height={300}
              />
              <p className="text-sm text-blue-500">{node.tags}</p>
                <p className="text-lg font-medium">{node.title}</p>
                <p className="text-gray-600">{node.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
        <Flex
          w="full"
          p={5}
          alignItems="center"
          justifyContent="center"
        >
        <Pagination
          baseStyles={{ bg: "whiteAlpha.50" }}
          activeStyles={{ bg: "blueMunsell.100" }}
          defaultCurrent={1}
          total={100}
          paginationProps={{ display: "flex"}}
          pageNeighbours={3}
          responsive
          rounded="full"
          onChange={(pageNumber) => onPageChange(pageNumber)}
        /> 
        </Flex>
      </main>
      <footer>
      </footer>
    </div>
  )
}