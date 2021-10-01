import { intArg, objectType, stringArg, extendType } from 'nexus';
import { User } from './User'

export const BandPost = objectType({
    name: 'BandPost',
    definition(t) {
        t.string('id')
        t.string('title')
        t.string('content')
        t.string('tags')
        t.string('imageUrl')
        t.string('createdAt')
        t.string('updatedAt')
        t.field('author', {
        type: User,
            async resolve(parent, _args, ctx) {
                return await ctx.prisma.bandPost
                .findUnique({
                    where: {
                    id: parent.id,
                    },
                })
                .author();
            },
        });
    }
})

export const Edge = objectType({
  name: 'Edge',
  definition(t) {
    t.string('cursor')
    t.field('node', {
      type: BandPost,
    })
  },
})

export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.string('endCursor')
    t.boolean('hasNextPage')
  },
})

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.field('pageInfo', { type: PageInfo })
    t.list.field('edges', {
      type: Edge,
    })
  },
})
  
export const BandPostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('bandPosts', {
      type: 'Response',
      args: {
        first: intArg(),
        after: stringArg(),
      },
      async resolve(_, args, ctx) {
        let queryResults = null

        if (args.after) {
          // check if there is a cursor as the argument
          queryResults = await ctx.prisma.bandPost.findMany({
            take: args.first, // the number of items to return from the database
            skip: 1, // skip the cursor
            cursor: {
              id: args.after, // the cursor
            },
          })
        } else {
          // if no cursor, this means that this is the first request
          //  and we will return the first items in the database
          queryResults = await ctx.prisma.bandPost.findMany({
            take: args.first,
          })
        }
        // if the initial request returns links
        if (queryResults.length > 0) {
          // get last element in previous result set
          const lastBandPostInResults = queryResults[queryResults.length - 1]
          // cursor we'll return in subsequent requests
          const myCursor = lastBandPostInResults.id

          // query after the cursor to check if we have nextPage
          const secondQueryResults = await ctx.prisma.bandPost.findMany({
            take: args.first,
            cursor: {
              id: myCursor,
            },
            orderBy: {
              id: 'asc',
            },
          })
          // return response
          const result = {
            pageInfo: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first, //if the number of items requested is greater than the response of the second query, we have another page
            },
            edges: queryResults.map(bandPost => ({
              cursor: bandPost.id,
              node: bandPost,
            })),
          }

          return result
        }
        //
        return {
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          edges: [],
        }
      },
    })
  },
})