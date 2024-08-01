import { gql } from "@apollo/client";

const GET_AUTHORS = gql`
  query getAuthorsQuery {
    authors {
      name
      id
    }
  }
`;

const GET_BOOKS = gql`
  query getBookQuery {
    books {
      name
      id
    }
  }
`;
const GET_BOOK = gql`
  query ($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

const ADD_BOOK_MUTATION = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
      genre
    }
  }
`;
//The $ sign is used to denote variables in GraphQL.
//These variables are placeholders for the actual values that will be provided when the mutation is executed.

export { GET_AUTHORS, GET_BOOKS, ADD_BOOK_MUTATION, GET_BOOK };
