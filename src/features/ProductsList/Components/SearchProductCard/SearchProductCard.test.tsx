import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchProductCard from "./SearchProductCard";
import type { Product } from "../../../../types/product";

const mockProduct: Product = {
  id: "MLA123",
  title: "Producto de prueba",
  price: 15000,
  currency_id: "ARS",
  condition: "new",
  thumbnail: "/images/product.jpg",
  reviews: {
    rating_average: 4.5,
    total: 10,
  },
  shipping: {
    free_shipping: true,
  },
  original_price: 20000,
  discount: 25,
  installments: {
    quantity: 6,
    amount: 2500,
  },
  seller: "Vendedor Ejemplo",
  official_store_name: "Tienda Oficial",
  variations: ["v1", "v2"],
};

describe("SearchProductCard", () => {
  it("renders all product info correctly", () => {
    render(
      <MemoryRouter>
        <SearchProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByAltText(/producto de prueba/i)).toBeInTheDocument();
    expect(screen.getByText("TIENDA OFICIAL")).toBeInTheDocument();
    expect(screen.getByText("Producto de prueba")).toBeInTheDocument();
    expect(screen.getByText(/Por Vendedor Ejemplo/)).toBeInTheDocument();
    expect(screen.getByText("$20.000")).toBeInTheDocument();
    expect(screen.getByText("$15.000")).toBeInTheDocument();
    expect(screen.getByText("25% OFF")).toBeInTheDocument();
    expect(
      screen.getByText(/Mismo precio en 6 cuotas de \$2.500/)
    ).toBeInTheDocument();
    expect(screen.getByText("Envío gratis")).toBeInTheDocument();
    expect(screen.getByText(/Disponible en 2 colores/)).toBeInTheDocument();
  });

  it("renders with minimal product data", () => {
    const minimalProduct: Product = {
      id: "MLA456",
      title: "Solo título",
      currency_id: "ARS",
      price: 1000,
      thumbnail: "/images/min.jpg",
      shipping: {
        free_shipping: false,
      },
      condition: "new",
    };

    render(
      <MemoryRouter>
        <SearchProductCard product={minimalProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText("Solo título")).toBeInTheDocument();
    expect(screen.getByText("$1.000")).toBeInTheDocument();
  });
});
