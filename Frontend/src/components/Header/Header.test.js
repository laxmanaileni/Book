import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header Component", () => {
  test("renders without any error", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  test("displays the correct title", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const titleElement = screen.getByText(/Book Management System/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the correct navigation links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const listOfBooksLink = screen.getByRole("link", { name: /List of Books/i });
    const addNewBookLink = screen.getByRole("link", { name: /Add New Book/i });
    expect(listOfBooksLink).toBeInTheDocument();
    expect(addNewBookLink).toBeInTheDocument();
  });

  test("navigation links are rendered as NavLink components", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const listOfBooksLink = screen.getByRole("link", { name: /List of Books/i });
    const addNewBookLink = screen.getByRole("link", { name: /Add New Book/i });
    expect(listOfBooksLink.tagName).toBe("A");
    expect(addNewBookLink.tagName).toBe("A");
  });

  test("navigation links have correct paths and names", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const listOfBooksLink = screen.getByRole("link", { name: /List of Books/i });
    const addNewBookLink = screen.getByRole("link", { name: /Add New Book/i });
    expect(listOfBooksLink.getAttribute("href")).toBe("/");
    expect(addNewBookLink.getAttribute("href")).toBe("/add");
  });

  test("has the correct CSS class applied", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const headerElement = screen.getByTestId("header-component");
    expect(headerElement).toHaveClass("header");
  });
});
