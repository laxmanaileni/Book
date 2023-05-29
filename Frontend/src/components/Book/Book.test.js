import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Book from "./Book";


jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Book Component", () => {
  const book = {
    id: 1,
    publicationYear: 2021,
    author: "John Doe",
    title: "Sample Book",
  };
  const handleRemoveBook = jest.fn();

  beforeEach(() => {
    useNavigate.mockClear();
    handleRemoveBook.mockClear();
  });

  test("renders without any error", () => {
    render(<Book book={book} handleRemoveBook={handleRemoveBook} />);
  });

  test("displays the correct book title", () => {
    render(<Book book={book} handleRemoveBook={handleRemoveBook} />);
    const titleElement = screen.getByText(/Sample Book/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("invokes the navigate function with the correct path when Edit button is clicked", () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(<Book book={book} handleRemoveBook={handleRemoveBook} />);
    const editButton = screen.getByRole("button", { name: /Edit/i });
    fireEvent.click(editButton);

    expect(navigate).toHaveBeenCalledWith(`/edit/${book.id}`);
  });

  test("invokes the handleRemoveBook function with the correct book ID when Delete button is clicked", () => {
    render(<Book book={book} handleRemoveBook={handleRemoveBook} />);
    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButton);

    expect(handleRemoveBook).toHaveBeenCalledWith(book.id);
  });
});
