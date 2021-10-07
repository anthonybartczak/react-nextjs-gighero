export const resolvers = {
    Query: {
        bandPosts: async (_parent, _args, ctx) => await ctx.prisma.bandPost.findMany()
    },
}