import { objectType } from 'nexus';
import { Post } from './Posts';

export const Tag = objectType({
  name: 'Tag',
  definition(t) {
    t.int('id');
    t.string('name');
    t.list.field('posts', {
      type: Post,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
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