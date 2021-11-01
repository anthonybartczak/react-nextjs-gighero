export const resolvers = {
    PostsQuery: {
        posts: async (_parent, _args, ctx) => await ctx.prisma.posts.findMany(),
    },
    TagsQuery: {
        posts: async (_parent, _args, ctx) => await ctx.prisma.tags.findMany(),
    },
}