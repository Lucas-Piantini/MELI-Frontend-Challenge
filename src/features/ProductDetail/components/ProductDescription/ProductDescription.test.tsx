import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductDescription from "./ProductDescription";

describe("ProductDescription", () => {
  const props = {
    description: "Este es un gran producto con muchas funciones.",
    attributes: [
      { id: "BRAND", name: "Marca", value_name: "Apple" },
      { id: "MODEL", name: "Modelo", value_name: "iPhone 16 Pro" },
      { id: "STORAGE", name: "Capacidad", value_name: "256 GB" },
    ],
  };

  it("renders the description text", () => {
    render(<ProductDescription {...props} />);
    expect(
      screen.getByText("Este es un gran producto con muchas funciones.")
    ).toBeInTheDocument();
  });

  it("renders the attributes list", () => {
    render(<ProductDescription {...props} />);
    props.attributes.forEach(({ name, value_name }) => {
      expect(screen.getByText(new RegExp(`${name}:`, "i"))).toBeInTheDocument();
      expect(screen.getByText(value_name)).toBeInTheDocument();
    });
  });

  it("renders section titles", () => {
    render(<ProductDescription {...props} />);
    expect(screen.getByText("Descripción")).toBeInTheDocument();
    expect(screen.getByText("Características")).toBeInTheDocument();
  });
});
