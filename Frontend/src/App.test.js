import React from "react";
import { cleanup, screen } from "@testing-library/react";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import App from "./App";

import {renderWithRedux,initialState} from "./utils/testUtils";

describe("Integration Test - App Component", () => {
  it("should render the Header component", () => {
    renderWithRedux(
      <Router>
        <App />
      </Router>,
      initialState
    );
    const headerElement = screen.getByTestId("header-component");
    expect(headerElement).toBeInTheDocument();
cleanup();
  });
  it("should render the ListBook component for the default route", () => {
    renderWithRedux(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
      initialState
    );

    const listBookElement = screen.getByTestId("list-book-component");
    expect(listBookElement).toBeInTheDocument();
   cleanup()
  });

  it("should render the AddEditForm component for the /add route", () => {
    renderWithRedux(
      <MemoryRouter initialEntries={["/add"]}>
        <App />
      </MemoryRouter>,
      initialState
    );
  
    const listBookElement = screen.queryByTestId("list-book-component");
    expect(listBookElement).not.toBeInTheDocument();
  
    const addEditFormElement = screen.getByTestId("add-edit-form-component");
    expect(addEditFormElement).toBeInTheDocument();

    cleanup()
  });
  
  

  it("should render the BookForm component for the /edit/:id route", () => {
    renderWithRedux(
      <MemoryRouter initialEntries={["/edit/7474e5d0-adf2-4ee1-b558-de1b35bd42a1"]}>
        <App />
      </MemoryRouter>,
      initialState
    );
    const listBookElement = screen.queryByTestId("list-book-component");
    expect(listBookElement).not.toBeInTheDocument();

    const bookFormElement = screen.getByTestId("add-edit-form-component");
    expect(bookFormElement).toBeInTheDocument();

    cleanup();
  });

  it("should render a fallback component or an error message for unknown routes", () => {
    renderWithRedux(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App />
      </MemoryRouter>,
      initialState
    );

    const fallbackElement = screen.getByTestId("fallback-component");
    expect(fallbackElement).toBeInTheDocument();

  });

  cleanup();
});
