import { prisma } from '../lib/prisma'
import { dummy } from '../data/dummy'

async function main() {
    const alice = await prisma.user.upsert({
      where: { email: 'alice@prisma.io' },
      update: {},
      create: {
        email: 'alice@prisma.io',
        name: 'Alice',
        bandPosts: {
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