import { enumType, objectType } from 'nexus';
import { BandPost } from './BandPost';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('email');
    t.string('image');
    t.float('rating');
    t.field('role', { type: Role });
    t.list.field('bandPosts', {
      type: BandPost,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .bandPosts()
      },
    })
  },
})

const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN'],
})