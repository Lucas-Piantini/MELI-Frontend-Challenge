// Pruebas del componente IconComponents
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import {
  ClockIcon,
  MagnifierIcon,
  StarIcon,
  HalfStarIcon,
  EmptyStarIcon,
} from "./index";

describe("SVG icon components", () => {
  it("renders ClockIcon", () => {
    render(<ClockIcon data-testid="clock-icon" />);
    expect(screen.getByTestId("clock-icon")).toBeInTheDocument();
  });

  it("renders MagnifierIcon with role and aria-label", () => {
    render(<MagnifierIcon />);
    const icon = screen.getByRole("img", { name: "Magnifier icon" });
    expect(icon).toBeInTheDocument();
  });

  it("renders StarIcon with role and aria-label", () => {
    render(<StarIcon />);
    const icon = screen.getByRole("img", { name: "Star icon" });
    expect(icon).toBeInTheDocument();
  });

  it("renders HalfStarIcon with role and aria-label", () => {
    render(<HalfStarIcon />);
    const icon = screen.getByRole("img", { name: "Half star icon" });
    expect(icon).toBeInTheDocument();
  });

  it("renders EmptyStarIcon with role and aria-label", () => {
    render(<EmptyStarIcon />);
    const icon = screen.getByRole("img", { name: "Empty star icon" });
    expect(icon).toBeInTheDocument();
  });
});
