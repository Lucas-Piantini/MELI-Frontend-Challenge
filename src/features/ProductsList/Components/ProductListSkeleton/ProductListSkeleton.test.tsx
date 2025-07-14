// Pruebas del componente ProductListSkeleton
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductListSkeleton from "./ProductListSkeleton";

describe("ProductListSkeleton", () => {
  it("renders 5 skeleton items", () => {
    render(<ProductListSkeleton />);

    const list = screen.getByTestId("product-list-skeleton");
    expect(list).toBeInTheDocument();

    const items = list.querySelectorAll("li");
    expect(items.length).toBe(5);
  });
});
