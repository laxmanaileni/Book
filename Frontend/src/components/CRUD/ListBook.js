import { useEffect } from "react";
import "./ListBook.css";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import { GET_BOOKS, DELETE_BOOK } from "../../graphql/queries";
import {
  deleteBook,
  setBooks,
  setSearchQuery,
  setSortOption,
} from "../../redux/slices/BookSlice";
import Book from "../Book/Book";

import SortingSearchingBook from "../SortingSearching/SortingSearchingBook";

const ListBook = () => {
  const books = useSelector((state) => state.book.books);
  const searchQuery = useSelector((state) => state.book.searchQuery);
  const sortOption = useSelector((state) => state.book.sortOption);
  const dispatch = useDispatch();
  const { data } = useQuery(GET_BOOKS);

  useEffect(() => {
    if (data && data.books) {
      dispatch(setBooks(data.books));
    }
  }, [data, dispatch]);

  const [deleteBookMutation] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleDelete = (id) => {
    deleteBookMutation({
      variables: { id },
    }).then(() => {
      dispatch(deleteBook(id));
    });
  };

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.publicationYear.toString().includes(searchQuery.toLowerCase())
    );
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption) {
      const [field, order] = sortOption.split("-");
      if (order === "ascInt" || order === "descInt") {
        if (order === "ascInt") {
          return parseInt(a[field]) - parseInt(b[field]);
        } else if (order === "descInt") {
          return parseInt(b[field]) - parseInt(a[field]);
        }
      } else {
        const aValue = a[field].toLowerCase();
        const bValue = b[field].toLowerCase();
        if (order === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else if (order === "desc") {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      }
    }
    return 0;
  });

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
  };

  const handleSort = (option) => {
    dispatch(setSortOption(option));
  };

  return (
    <div data-testid="list-book-component">
      <SortingSearchingBook onSort={handleSort} onSearch={handleSearch} />
      <div className="listBook">
        {sortedBooks.length ? (
          sortedBooks.map((book) => (
            <Book key={book.id} book={book} handleRemoveBook={handleDelete} />
          ))
        ) : (
          <p className="noData">Oops! No books are available right now ...</p>
        )}
      </div>
    </div>
  );
};

export default ListBook;
