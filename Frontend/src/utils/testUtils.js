import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import bookReducer from "../redux/slices/BookSlice";

// Reusable code for writing intergration testing

const setupStore = (initialState) => {
  return configureStore({
    reducer: {
      book: bookReducer,
    },
    preloadedState: initialState,
  });
};

export const initialState = {
  book: {
    books: [],
    searchQuery: "",
    sortOption: "",
  },
};

export const renderWithRedux = (component, initialState) => {
  const store = setupStore(initialState);
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });
  return render(
    <ApolloProvider client={client}>
      <Provider store={store}>{component}</Provider>
    </ApolloProvider>
  );
};
