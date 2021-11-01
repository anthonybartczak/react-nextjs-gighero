import { intArg, objectType, extendType } from 'nexus';
import { Tag } from './Tags';
import { User } from './User'


export const Post = objectType({
    name: 'Post',
    definition(t) {
        t.string('id')
        t.string('title')
        t.string('content')
        t.string('imageUrl')
        t.string('createdAt')
        t.string('updatedAt')
        t.list.field('tags', {
          type: Tag,
          async resolve(_parent, _args, ctx) {
            return await ctx.prisma.post
              .findUnique({
                  where: {
                    id: _parent.id,
                  },
              })
            .tags()
          }
        })
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
      })
    }
})

export const PostEdge = objectType({
  name: 'PostEdges',
  definition(t) {
    t.field('node', {
      type: Post,
    })
  },
})

export const PostResponse = objectType({
  name: 'PostResponse',
  definition(t) {
    t.list.field('edges', {
      type: PostEdge,
    })
    t.int('count')
  },
})

export const PostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('posts', {
      type: 'PostResponse',
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

        resultCount = await ctx.prisma.post.count()

        if (queryResults.length > 0) {
          const result = {
            edges: queryResults.map((post: any) => ({
              node: post,
            })),
            count: resultCount
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