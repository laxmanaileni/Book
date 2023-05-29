import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author
      publicationYear
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $author: String!
    $publicationYear: Int!
  ) {
    createBook(
      title: $title
      author: $author
      publicationYear: $publicationYear
    ) {
      id
      title
      author
      publicationYear
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: ID!
    $title: String!
    $author: String!
    $publicationYear: Int!
  ) {
    updateBook(
      id: $id
      title: $title
      author: $author
      publicationYear: $publicationYear
    ) {
      id
      title
      author
      publicationYear
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      title
    }
  }
`;
