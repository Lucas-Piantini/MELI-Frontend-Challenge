// Pruebas del componente Button
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Button from "./Button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button label="Click me" />);
    const button = screen.getByRole("button", { name: "Click me" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue-500");
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders with variant secondary", () => {
    render(<Button label="Secondary" variant="secondary" />);
    const button = screen.getByRole("button", { name: "Secondary" });

    expect(button).toHaveClass("bg-gray-200");
    expect(button).toHaveClass("text-meliBlue");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button label="Click" onClick={handleClick} />);
    const button = screen.getByRole("button", { name: "Click" });

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("sets the button type to submit", () => {
    render(<Button label="Submit" type="submit" />);
    const button = screen.getByRole("button", { name: "Submit" });

    expect(button).toHaveAttribute("type", "submit");
  });
});
