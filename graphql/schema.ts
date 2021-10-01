import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
    type bandPost {
        id: String
        title: String
        content: String
        tags: String
        imageUrl: String
        createdAt: String
        updatedAt: String
        author: String
        authorId: String
    }

    type Query {
        bandPosts: [bandPost]!
    }
`;

