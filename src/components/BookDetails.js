import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  });

  //   console.log(data);
  //   console.log(bookId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.book) {
    return <div>No book selected...</div>;
  }

  const { book } = data;

  return (
    <div id="book-details">
      <h2>{book.name}</h2>
      <p>{book.genre}</p>
      <p>{book.author.name}</p>
      <p>All books by this author:</p>
      <ul className="other-books">
        {book.author.books.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookDetails;
