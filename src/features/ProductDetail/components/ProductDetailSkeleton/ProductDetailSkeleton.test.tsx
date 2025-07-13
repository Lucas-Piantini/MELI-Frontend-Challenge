import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ProductDetailSkeleton from "./ProductDetailSkeleton";

describe("ProductDetailSkeleton", () => {
  it("renders skeleton elements", () => {
    const { container } = render(<ProductDetailSkeleton />);

    // Verifica que existan los elementos con la clase shimmer
    const shimmerElements = container.querySelectorAll(".shimmer");
    expect(shimmerElements.length).toBeGreaterThan(0);

    // Verifica que haya 4 thumbnails + 1 imagen principal + otros bloques
    expect(container.querySelectorAll(".w-16.h-16.shimmer").length).toBe(4);
    expect(
      container.querySelector(
        ".w-full.md\\:w-\\[400px\\].h-\\[400px\\].shimmer"
      )
    ).toBeTruthy();

    // Verifica que haya al menos una skeleton de título y una de descripción
    expect(container.querySelector(".h-4.shimmer")).toBeTruthy();
    expect(container.querySelector(".h-8.shimmer")).toBeTruthy();
  });
});
