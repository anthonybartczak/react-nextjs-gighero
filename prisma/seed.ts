import prisma from '../lib/prisma'
import { dummy } from '../data/dummy'

async function main() {
    const alice = await prisma.user.upsert({
      where: { email: 'charlie@prisma.io' },
      update: {},
      create: {
        email: 'charlie@prisma.io',
        name: 'Charlie',
        posts: {
          create: dummy,
        },
      },
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