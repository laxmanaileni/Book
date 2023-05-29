import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateBook, addBook } from "../../redux/slices/BookSlice";
import { useMutation } from "@apollo/client";
import { UPDATE_BOOK, CREATE_BOOK, GET_BOOKS } from "../../graphql/queries";
import Form from "../Form/Form";

const AddEditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const books = useSelector((state) => state.book.books);
  const dispatch = useDispatch();
  const bookToEdit = books.find((book) => book.id === id);
  const [error, setError] = useState(null);

  const [mutateBook] = useMutation(id ? UPDATE_BOOK : CREATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],onError: (apolloError) => {
      setError(apolloError);
    },
  });

  const handleSubmit = (book) => {
    const { title, author, publicationYear } = book;
    if (title && author && publicationYear) {
      const variables = {
        id,
        title,
        author,
        publicationYear: parseInt(publicationYear),
      };

      mutateBook({ variables }).then((response) => {
        const { ids, title, author, publicationYear } =
          response.data[id ? "updateBook" : "createBook"];

        if (id) {
          dispatch(
            updateBook({
              id,
              title: title,
              author: author,
              publicationYear: publicationYear,
            })
          );
        } else {
          dispatch(addBook({ ids, title, author, publicationYear }));
        }

        navigate("/");
      }).catch((error) => {
        setError(error);
      });
    }
  };

  return (
    <div className="bookForm" data-testid="add-edit-form-component">
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Form book={bookToEdit} handleSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default AddEditBook;
