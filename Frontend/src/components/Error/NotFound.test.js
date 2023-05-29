import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

describe("NotFound Component", () => {
  test("renders without any error", () => {
    render(<NotFound />);
  });

  test("displays the correct title and message", () => {
    render(<NotFound />);
    const titleElement = screen.getByText(/404 - Page Not Found/i);
    const messageElement = screen.getByText(
      /Sorry, the page you're looking for does not exist./i
    );
    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });

  test("has the correct CSS class applied", () => {
    render(<NotFound />);
    const notFoundElement = screen.getByTestId("fallback-component");
    expect(notFoundElement).toHaveClass("notfound");
  });
});
