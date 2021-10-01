export const resolvers = {
    Query: {
        bandPosts: async (_parent, args, ctx) => await ctx.prisma.bandPost.findMany()
    },
}