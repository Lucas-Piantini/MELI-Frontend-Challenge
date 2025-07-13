import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders App and shows the default route content", async () => {
    render(<App />);

    expect(
      await screen.findByPlaceholderText(/buscar productos/i)
    ).toBeInTheDocument();
  });
});
