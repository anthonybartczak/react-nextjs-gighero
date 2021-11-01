import { extendType, objectType } from 'nexus';
import { Post } from './Posts';


export const Tag = objectType({
  name: 'Tag',
  definition(t) {
    t.int('id');
    t.string('name');
    t.list.field('posts', {
      type: Post,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.tag
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .posts()
      },
    })
  },
})

export const TagEdge = objectType({
  name: 'TagEdges',
  definition(t) {
    t.field('node', {
      type: Tag,
    })
  },
})

export const TagResponse = objectType({
  name: 'TagResponse',
  definition(t) {
    t.list.field('edges', {
      type: TagEdge,
    })
    t.int('count')
  },
})

export const TagsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('tags', {
      type: 'TagResponse',
      async resolve(_, args, ctx) {
        let queryResults = null
        let resultCount = null

        queryResults = await ctx.prisma.tag.findMany()
        resultCount = await ctx.prisma.tag.count()

        if (queryResults.length > 0) {
          const result = {
            edges: queryResults.map((tag: any) => ({
              node: tag,
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