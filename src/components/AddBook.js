import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK_MUTATION, GET_BOOKS } from "../queries/queries";

const AddBook = () => {
  const [formdata, setformdata] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [
    addBook,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_BOOK_MUTATION);
  if (error) return <p>Error: {error.message}</p>;

  function handleChange(e) {
    const { name, value } = e.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    // console.log(formdata);
    addBook({
      variables: {
        name: formdata.name,
        genre: formdata.genre,
        authorId: formdata.authorId,
      },
      refetchQueries: [{ query: GET_BOOKS }],
    });
  };

  //   console.log(data);
  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          name="name"
          value={formdata.name}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={formdata.genre}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          name="authorId"
          value={formdata.authorId}
          onChange={handleChange}
        >
          {loading ? (
            <option disabled>Loading Authors...</option>
          ) : (
            data.authors.map((author) => {
              return (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              );
            })
          )}
        </select>
      </div>
      <button type="submit" disabled={mutationLoading}>
        +
      </button>
      {mutationError && <p>Error: {mutationError.message}</p>}
      {/* {mutationData && <p>Book Added successfully</p>} */}
    </form>
  );
};

export default AddBook;
