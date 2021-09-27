import Head from 'next/head'
import Navbar from '../components/Navbar'
import { PrismaClient } from '@prisma/client';

export async function getStaticProps() {
  const prisma = new PrismaClient()
  const ads = await prisma.bandPost.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { ads } };
};


export default function Home({ ads }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <main>
        {ads.map(ad => (
        <div key={ad.id}>
          <h2>{ad.title}</h2>
          <p>{ad.content}</p>
        </div>
        ))}
      </main>
      <footer>
      </footer>
    </div>
  )
}
