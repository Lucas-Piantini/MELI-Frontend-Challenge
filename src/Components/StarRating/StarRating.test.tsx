// Pruebas del componente StarRating
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StarRating from "./StarRating";


describe("StarRating", () => {
  it("renders 5 full stars for rating 5", () => {
    render(<StarRating rating={5} total={123} />);

    expect(screen.getByText("5.0")).toBeInTheDocument();
    expect(screen.getByText("(123)")).toBeInTheDocument();

    expect(screen.getAllByLabelText("Star icon")).toHaveLength(5);
    expect(screen.queryByLabelText("Half star icon")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Empty star icon")).not.toBeInTheDocument();
  });

  it("renders 4 full stars and 1 half star for rating 4.5", () => {
    render(<StarRating rating={4.5} total={10} />);

    expect(screen.getAllByLabelText("Star icon")).toHaveLength(4);
    expect(screen.getAllByLabelText("Half star icon")).toHaveLength(1);
    expect(screen.queryAllByLabelText("Empty star icon")).toHaveLength(0);
  });

  it("renders 3 full, 1 half, and 1 empty star for rating 3.5", () => {
    render(<StarRating rating={3.5} total={20} />);

    expect(screen.getAllByLabelText("Star icon")).toHaveLength(3);
    expect(screen.getAllByLabelText("Half star icon")).toHaveLength(1);
    expect(screen.getAllByLabelText("Empty star icon")).toHaveLength(1);
  });

  it("renders 0 full, 0 half, and 5 empty stars for rating 0", () => {
    render(<StarRating rating={0} total={0} />);

    expect(screen.queryAllByLabelText("Star icon")).toHaveLength(0);
    expect(screen.queryAllByLabelText("Half star icon")).toHaveLength(0);
    expect(screen.getAllByLabelText("Empty star icon")).toHaveLength(5);
  });
});
