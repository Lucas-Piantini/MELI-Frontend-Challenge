import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorScreen from "./ErrorScreen";

describe("ErrorScreen", () => {
  it("renders the error image", () => {
    render(<ErrorScreen />);
    const image = screen.getByAltText("Error inesperado");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/error.png");
  });

  it("renders the error title", () => {
    render(<ErrorScreen />);
    expect(
      screen.getByRole("heading", { name: "Hubo un error inesperado" })
    ).toBeInTheDocument();
  });

  it("renders the error description", () => {
    render(<ErrorScreen />);
    expect(
      screen.getByText(/Por favor, intentá nuevamente más tarde/i)
    ).toBeInTheDocument();
  });
});
