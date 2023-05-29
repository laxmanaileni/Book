import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

describe("Form Component", () => {
  const handleSubmit = jest.fn();

  test("renders without any error", () => {
    render(<Form handleSubmit={handleSubmit} />);
  });

  test("displays the correct input field labels and placeholders", () => {
    render(<Form handleSubmit={handleSubmit} />);
    const titleLabel = screen.getByLabelText(/Book Title/i);
    const authorLabel = screen.getByLabelText(/Book Author/i);
    const publicationYearLabel = screen.getByLabelText(/Book Publication Year/i);

    expect(titleLabel).toBeInTheDocument();
    expect(authorLabel).toBeInTheDocument();
    expect(publicationYearLabel).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText(/Enter title of Book/i);
    const authorInput = screen.getByPlaceholderText(/Enter name of Author/i);
    const publicationYearInput = screen.getByPlaceholderText(/Enter year of Publication/i);

    expect(titleInput).toBeInTheDocument();
    expect(authorInput).toBeInTheDocument();
    expect(publicationYearInput).toBeInTheDocument();
  });

  test("updates the form state when input fields are changed", () => {
    render(<Form handleSubmit={handleSubmit} />);
    const titleInput = screen.getByPlaceholderText(/Enter title of Book/i);
    const authorInput = screen.getByPlaceholderText(/Enter name of Author/i);
    const publicationYearInput = screen.getByPlaceholderText(/Enter year of Publication/i);

    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(authorInput, { target: { value: "New Author" } });
    fireEvent.change(publicationYearInput, { target: { value: "2023" } });

    expect(titleInput.value).toBe("New Title");
    expect(authorInput.value).toBe("New Author");
    expect(publicationYearInput.value).toBe("2023");
  });

  test("invokes the handleSubmit function with the correct form state when submitted", () => {
    render(<Form handleSubmit={handleSubmit} />);
    const titleInput = screen.getByPlaceholderText(/Enter title of Book/i);
    const authorInput = screen.getByPlaceholderText(/Enter name of Author/i);
    const publicationYearInput = screen.getByPlaceholderText(/Enter year of Publication/i);
    const submitButton = screen.getByRole("button", { name: /Add Book/i });

    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(authorInput, { target: { value: "New Author" } });
    fireEvent.change(publicationYearInput, { target: { value: "2023" } });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      title: "New Title",
      author: "New Author",
      publicationYear: "2023",
    });
  });

  test("disables the submit button when any of the required fields is empty", () => {
    render(<Form handleSubmit={handleSubmit} />);
    const submitButton = screen.getByRole("button", { name: /Add Book/i });

    expect(submitButton).toBeDisabled();

    const titleInput = screen.getByPlaceholderText(/Enter title of Book/i);
    fireEvent.change(titleInput, { target: { value: "New Title" } });

    expect(submitButton).toBeDisabled();

    const authorInput = screen.getByPlaceholderText(/Enter name of Author/i);
    fireEvent.change(authorInput, { target: { value: "New Author" } });

    expect(submitButton).toBeDisabled();

    const publicationYearInput = screen.getByPlaceholderText(/Enter year of Publication/i);
    fireEvent.change(publicationYearInput, { target: { value: "2023" } });

    expect(submitButton).not.toBeDisabled();
  });
});
