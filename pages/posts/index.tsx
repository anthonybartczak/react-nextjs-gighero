import Head from 'next/head'
import Navbar from '../../components/Navbar'
import { gql, useQuery } from '@apollo/client'
import Pagination from "@choc-ui/paginator";
import { Box, Text, Avatar, Flex, Link, Image, InputGroup, InputLeftElement, Input, Select, CircularProgress, Tag } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GiModernCity } from "react-icons/gi";
import { CUIAutoComplete } from 'chakra-ui-autocomplete'


export interface Item {
  label: string;
  value: string;
}

const allPostsQuery = gql`
  query allPostsQuery($first: Int, $offset: Int) {
    posts(first: $first, offset: $offset) {
      edges {
        node {
          imageUrl
          id
          author {
            name
          }
          title
          tags {
            label
          }
        }
      }
      count
    }
  }
`;

const allTagsQuery = gql`
   query allTagsQuery {
    tags {
      edges {
        value
        label
      }
    }
  }
`;

export default function Home() {

  const router = useRouter()
  const [pageIndex, setPageIndex] = useState(1);
  const [pickerItems, setPickerItems] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);

  const {loading: loadingPosts, data: dataPosts, error: errorPosts, fetchMore: fetchMorePosts} = useQuery(allPostsQuery, {
      variables: {
        first: 10,
        offset: 0
      },
    fetchPolicy: "cache-and-network"
  });

  const {
    loading: loadingTags,
    data: dataTags,
    error: errorTags
  } = useQuery(allTagsQuery, {
      fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if(loadingTags === false && dataTags){
        setPickerItems(dataTags.tags.edges);
    }
  }, [loadingTags, dataTags])

  const truncate = (str: String) => {
    return str.length > 15 ? str.substring(0, 14) + "..." : str;
  }

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  const handleCreateItem = (item: Item) => {
    setPickerItems((current) => [...current, item]);
    setSelectedItems((current) => [...current, item]);
  };

  function OnPageChange(pageNumber: number): void {
    console.log(pageNumber)
    setPageIndex(pageNumber)
    fetchMorePosts({
      variables: {
        limit: 10,
        offset: (pageNumber - 1) * 10
      },
    });
    router.push(`/posts?page=${pageNumber}`)
  }

  if (loadingPosts) return <CircularProgress isIndeterminate color="brandRed.500" size="300px" thickness="4px"/>
  if (errorPosts) return <p>Oh no... {errorPosts.message}</p>

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <main>
        <div className="container mx-auto shadow max-w-4xl rounded mt-10 items-center p-1 bg-white">
          <Flex className="">
            <InputGroup backgroundColor="gray.50" className="pr-2">
              <InputLeftElement
                pointerEvents="none"
                // eslint-disable-next-line react/no-children-prop
                children={<GiModernCity className="text-gray-400"/>}/>
              <Input type="city" placeholder="Miasto" focusBorderColor="brandRed.200"/>
            </InputGroup>
            <Select backgroundColor="gray.50" focusBorderColor="brandRed.200">
              <option value="date-latest">Najnowsze ogłoszenia</option>
              <option value="date-oldest">Najstarsze ogłoszenia</option>
            </Select>
          </Flex>
        </div>
        <Flex>
        <div className="container ml-5 shadow max-w-sm , rounded mt-10 items-center bg-white px-2">
          <CUIAutoComplete
            label=""
            placeholder="Wybierz rodzaj muzyki"
            onCreateItem={handleCreateItem}
            items={pickerItems}
            selectedItems={selectedItems}
            onSelectedItemsChange={(changes) =>
              handleSelectedItemsChange(changes.selectedItems)
            }
          />
          </div>
        <div className="flex container ml-5 mr-64 max-w-6xl my-10 items-center">
          <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2">
            {dataPosts?.posts.edges.map(({node}: any, i: React.Key) => (
              <li key={i}>
                <Box
                  shadow="sm"
                  mx="auto"
                  rounded="md"
                  backgroundColor="white"
                  width="2xl"
                  display="flex"
                  className="transform hover:scale-105 transition duration-200 ease-in-out"
                >
                <Image
                  rounded="sm"
                  w={250}
                  h={150}
                  fit="cover"
                  src={node.imageUrl}
                  alt="Article"
                  margin={0.5}
                />
                <Box className="px-4">
                  <Box>
                    <Link
                      display="block"
                      color={"black"}
                      fontWeight="bold"
                      fontSize="2xl"
                      mt={2}
                      _hover={{ color: "gray.600", textDecor: "underline" }}
                    >
                      {node.title}
                    </Link>
                    <Flex flexDirection="row" py={2}>
                      {node?.tags.map(({tag}: any, i: React.Key) => (
                        <Tag key={i} colorScheme="brandOrangeRed" className="mr-2">
                          {truncate(node.tags[i]?.label)}
                        </Tag>
                      ))}
                    </Flex>
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
                          <Link mx={2} fontWeight="bold" color={"black"}>
                            {node.author.name}
                          </Link>
                        </Flex>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              </li>
            ))}
          </ul>
        </div>
        </Flex>
        <Flex
            w="full"
            p={5}
            alignItems="center"
            justifyContent="center"
          >
          <Pagination
            baseStyles={{ bg: "whiteAlpha.50" }}
            activeStyles={{ bg: "brandRed.300" }}
            defaultCurrent={pageIndex}
            total={dataPosts.posts.count}
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
