export const resolvers = {
    Query: {
        posts: async (_parent, _args, ctx) => await ctx.prisma.posts.findMany(),
        tags: async (_parent, _args, ctx) => await ctx.prisma.tags.findMany()
    }
}