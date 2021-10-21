import { intArg, objectType, stringArg, extendType } from 'nexus';
import { User } from './User'

export const Post = objectType({
    name: 'Post',
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
              return await ctx.prisma.post
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
      type: Post,
    })
  },
})

export const Aggregate = objectType({
  name: 'Aggregate',
  definition(t) {
    t.field('_count', {
      type: 'Count'
    })
  },
})

export const Count = objectType({
  name: 'Count',
  definition(t) {
    t.int('_all')
  },
})

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.list.field('edges', {
      type: Edge,
    })
    t.field('aggregate', { 
      type: Aggregate,
    })
  },
})

export const PostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('posts', {
      type: 'Response',
      args: {
        first: intArg(),
        offset: intArg(),
      },
      async resolve(_, args, ctx) {
        let queryResults = null
        let resultCount = null

        queryResults = await ctx.prisma.post.findMany({
          take: args.first, // => the number of items to return from the database
          skip: args.offset, // skip the cursor
        })

        resultCount = await ctx.prisma.post.aggregate({
          _count: { _all: true }
        })

        if (queryResults.length > 0) {
          const result = {
            edges: queryResults.map((post: any) => ({
              node: post,
            })),
            aggregate: resultCount
          }
          return result
        }
        return {
          edges: [],
        }
      },
    })
  },
})