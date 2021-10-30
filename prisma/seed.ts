import prisma from '../lib/prisma'
import { dummyPosts } from '../data/posts'
import { dummyTags } from '../data/tags'

async function main() {

  await prisma.user.upsert({
    where: { email: 'charlie@prisma.io' },
    update: {},
    create: {
      email: 'charlie@prisma.io',
      name: 'Charlie',
      posts: {
        create: dummyPosts,
      },
    },
  })

  await prisma.tag.createMany({
    data: dummyTags,
  })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })