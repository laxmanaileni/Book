import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SortingSearchingBook from "./SortingSearchingBook";

describe("SortingSearchingBook", () => {
  it("should render the SortingSearchingBook component", () => {
    render(<SortingSearchingBook />);
    const appElement = screen.getByTestId("sorting-searching-book");
    expect(appElement).toBeInTheDocument();
  });

  it("should call the onSort function when sorting option is changed", () => {
    const mockOnSort = jest.fn();
    render(<SortingSearchingBook onSort={mockOnSort} />);
    const sortElement = screen.getByTestId("sort-select");
    fireEvent.change(sortElement, { target: { value: "title-asc" } });

    expect(mockOnSort).toHaveBeenCalledWith("title-asc");
  });

  it("should call the onSearch function when search input value is changed", () => {
    const mockOnSearch = jest.fn();
    render(<SortingSearchingBook onSearch={mockOnSearch} />);
    const searchInput = screen.getByTestId("search-input");

    fireEvent.change(searchInput, { target: { value: "query" } });

    expect(mockOnSearch).toHaveBeenCalledWith("query");
  });
});
