import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import bookReducer from "./redux/slices/BookSlice";
import App from "./App";

describe("Integration Test - Render App Component", () => {
  it("should render the App component within the root element", () => {
    const client = new ApolloClient({
      uri: "http://localhost:4000/graphql",
      cache: new InMemoryCache(),
    });
    const store = configureStore({
      reducer: {
        book: bookReducer,
      },
    });
    render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </ApolloProvider>
    );

    const appElement = screen.getByTestId("app-component");
    expect(appElement).toBeInTheDocument();
    expect(appElement.tagName).toBe("DIV");
  });
});
