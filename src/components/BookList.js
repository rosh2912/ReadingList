import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [selcetedId, setselcetedId] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // console.log(data);
  return (
    <div>
      {data.books.map((book) => (
        <ul id="book-list" key={book.id}>
          <li key={book.id} onClick={() => setselcetedId(book.id)}>
            {book.name}
          </li>
        </ul>
      ))}
      {selcetedId && <BookDetails bookId={selcetedId} />}
    </div>
  );
};

export default BookList;
