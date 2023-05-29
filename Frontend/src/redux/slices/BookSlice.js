import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  searchQuery: "",
  sortOption: "",
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action) => {
      const { id, title, author, publicationYear } = action.payload;
      const book = state.books.find((book) => book.id === id);
      if (book) {
        book.title = title;
        book.author = author;
        book.publicationYear = publicationYear;
      }
    },
    deleteBook: (state, action) => {
      const id = action.payload;
      state.books = state.books.filter((book) => book.id !== id);
    },
  },
});

export const {
  setBooks,
  setSearchQuery,
  setSortOption,
  addBook,
  updateBook,
  deleteBook,
} = bookSlice.actions;

export default bookSlice.reducer;
