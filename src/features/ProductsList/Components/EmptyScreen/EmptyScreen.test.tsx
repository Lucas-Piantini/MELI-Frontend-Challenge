import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EmptyScreen from "./EmptyScreen";

describe("EmptyScreen", () => {
  it("renders the empty screen message and image", () => {
    render(<EmptyScreen />);

    expect(screen.getByAltText("Sin resultados")).toBeInTheDocument();
    expect(
      screen.getByText("No encontramos lo que buscás")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Probá con otro término de búsqueda/i)
    ).toBeInTheDocument();
  });
});
