import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../redux/slices/BookSlice";

const Apollo = ({ children }) => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  const store = configureStore({
    reducer: {
      book: bookReducer,
    },
  });

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>{children}</Provider>
    </ApolloProvider>
  );
};

export default Apollo;
