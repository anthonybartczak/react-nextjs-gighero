import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
    type bandPost {
        id: String
        title: String
        content: String
        tags: String
        imageUrl: String
        createdAt: DateTime
        updatedAt: DateTime
        author: String
        authorId: String
    }

    type Query {
        bandPosts: [BandPost]!
    }

`

