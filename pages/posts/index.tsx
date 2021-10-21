import Head from 'next/head'
//import Image from 'next/image'
import Navbar from '../../components/Navbar'
import { gql, useQuery } from '@apollo/client'
import Pagination from "@choc-ui/paginator";
import { Box, chakra, Flex, Link, Image } from "@chakra-ui/react";
import React, { useState } from 'react';
import { useRouter } from 'next/router';


const allPostsQuery = gql`
  query allPostsQuery($first: Int, $offset: Int) {
    posts(first: $first, offset: $offset) {
      aggregate {
        _count {
          _all
        }
      }
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

  const router = useRouter()
  const [pageIndex, setPageIndex] = useState(1);

  const { loading, data, error, fetchMore } = useQuery(allPostsQuery, {
    variables: {
      first: 10,
      offset: 0
    },
    fetchPolicy: "cache-and-network"
  });

  function OnPageChange(pageNumber: number): void {
    setPageIndex(pageNumber)
    fetchMore({
      variables: {
        limit: 10,
        offset: pageNumber - 1
      },
    });
    router.push(`/posts?page=${pageNumber}`)
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
      <div className="container mx-auto shadow w-xl rounded mt-10">
        <div>placeholder</div>
      </div>
      <div className="container mx-auto max-w-6xl my-5">
        <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-5 place-items-center">
          {data?.posts.edges.map(({ node }) => (
            <li key={node.id} className="shadow w-xl rounded">
            <Box
              mx="auto"
              rounded="lg"
              shadow="md"
              bg={"gray.800"}
              maxW="2xl"
              display="flex"
            >
              <Image
                roundedLeft="lg"
                w={300}
                h={200}
                fit="cover"
                src={node.imageUrl}
                alt="Article"
                margin={2}
              />
              <Box p={6}>
                <Box>
                  <chakra.span
                    fontSize="xs"
                    textTransform="uppercase"
                    color={"brand.400"}
                  >
                    Product
                  </chakra.span>
                  <Link
                    display="block"
                    color={"white"}
                    fontWeight="bold"
                    fontSize="2xl"
                    mt={2}
                    _hover={{ color: "gray.600", textDecor: "underline" }}            
                  >
                    123123213
                  </Link>
                  <chakra.p
                    mt={2}
                    fontSize="sm"
                    color={"gray.400"}
                  >
                  </chakra.p>
                </Box>
                <Box mt={4}>
                  <Flex alignItems="center">
                    <Flex alignItems="center">
                      <Image
                        h={10}
                        fit="cover"
                        rounded="full"
                        src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                        alt="Avatar"
                      />
                      <Link
                        mx={2}
                        fontWeight="bold"
                        color={"gray.200"}
                      >
                        Jone Doe
                      </Link>
                    </Flex>
                      <chakra.span
                        mx={1}
                        fontSize="sm"
                        color={"gray.300"}
                      >
                        21 SEP 2015
                      </chakra.span>
                    </Flex>
                  </Box>
                </Box>
              </Box>
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
          defaultCurrent={pageIndex}
          total={data.posts.aggregate._count._all}
          paginationProps={{ display: "flex"}}
          pageNeighbours={3}
          responsive
          rounded="full"
          onChange={(pageNumber) => OnPageChange(pageNumber)}
        /> 
        </Flex>
      </main>
      <footer>
      </footer>
    </div>
  )
}
