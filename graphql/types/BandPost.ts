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
  name: 'Edges',
  definition(t) {
    t.field('node', {
      type: BandPost,
    })
  },
})

export const Response = objectType({
  name: 'Response',
  definition(t) {
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
        offset: intArg(),
      },
      async resolve(_, args, ctx) {
        let queryResults = null

        queryResults = await ctx.prisma.bandPost.findMany({
          take: args.first, // => the number of items to return from the database
          skip: args.offset, // skip the cursor
        })

        if (queryResults.length > 0) {
          const result = {
            edges: queryResults.map(bandPost => ({
              node: bandPost,
            })),
          }

          return result
        }
        //
        return {
          edges: [],
        }
      },
    })
  },
})