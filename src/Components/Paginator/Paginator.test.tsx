import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Paginator from "./Paginator";

describe("Paginator", () => {
  const defaultProps = {
    total: 100,
    offset: 0,
    limit: 10,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    defaultProps.onPageChange.mockClear();
  });

  it("renders correct number of page buttons", () => {
    render(<Paginator {...defaultProps} />);
    // total = 100, limit = 10 → totalPages = 10
    // current page = offset / limit + 1 = 1
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("calls onPageChange when a page button is clicked", () => {
    render(<Paginator {...defaultProps} />);
    const page2 = screen.getByText("2");
    fireEvent.click(page2);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it("shows 'Siguiente' button on first page", () => {
    render(<Paginator {...defaultProps} />);
    expect(screen.getByText("Siguiente")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Siguiente"));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it("shows 'Anterior' button on later pages", () => {
    render(<Paginator {...defaultProps} offset={30} />);
    expect(screen.getByText("Anterior")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Anterior"));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it("highlights current page button", () => {
    render(<Paginator {...defaultProps} offset={30} />);
    const currentPage = screen.getByText("4");
    expect(currentPage).toHaveClass("border-[#3483fa]");
    expect(currentPage).toHaveClass("font-semibold");
  });
});
