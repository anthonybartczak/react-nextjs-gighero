import { PrismaClient } from '@prisma/client';

export const getServerSideProps = async ({ req }) => {
    const prisma = new PrismaClient()
    const post = await prisma.bandPost.findUnique({
        where: {
        id: Number(params?.id) || -1,
        },
        include: {
        author: {
            select: { name: true },
        },
        },
    });
    return {
        props: post,
    };
};