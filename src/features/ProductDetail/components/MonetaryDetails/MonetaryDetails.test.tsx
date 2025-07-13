import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MonetaryDetails from "./MonetaryDetails";

describe("MonetaryDetails", () => {
  const props = {
    title: "iPhone 14 Pro Max",
    price: 1200000,
    original_price: 1500000,
    condition: "new",
    installments: { quantity: 12, amount: 100000 },
    shipping: { free_shipping: true },
    seller_address: {
      city: { name: "CABA" },
      state: { name: "Buenos Aires" },
    },
    warranty: "Garantía del vendedor: 6 meses",
    sold_quantity: 8,
    reviews: {
      rating_average: 4.5,
      total: 10,
    },
  };

  it("renders all basic info correctly", () => {
    render(<MonetaryDetails {...props} />);

    expect(screen.getByText("Nuevo | 8 vendidos")).toBeInTheDocument();
    expect(screen.getByText("iPhone 14 Pro Max")).toBeInTheDocument();
    expect(
      screen.getByText("$1.500.000", { exact: false })
    ).toBeInTheDocument(); // original price
    expect(
      screen.getByText("$1.200.000", { exact: false })
    ).toBeInTheDocument(); // price
    expect(
      screen.getByText("mismo precio en 12 cuotas de $100.000")
    ).toBeInTheDocument();
    expect(screen.getByText("Envío gratis")).toBeInTheDocument();
    expect(
      screen.getByText("Ubicación del vendedor: CABA, Buenos Aires")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Garantía del vendedor: 6 meses")
    ).toBeInTheDocument();
  });

  it("renders both buttons", () => {
    render(<MonetaryDetails {...props} />);
    expect(screen.getByText("Comprar ahora")).toBeInTheDocument();
    expect(screen.getByText("Agregar al carrito")).toBeInTheDocument();
  });

  it("renders rating if reviews are present", () => {
    render(<MonetaryDetails {...props} />);
    expect(screen.getByText("(10)")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("does not render original_price, shipping or installments if not provided", () => {
    const noExtras = {
      ...props,
      original_price: undefined,
      installments: undefined,
      shipping: { free_shipping: false },
    };
    render(<MonetaryDetails {...noExtras} />);
    expect(
      screen.queryByText(/\$\d+\.\d+/, { exact: false })
    ).toBeInTheDocument(); // price still visible
    expect(screen.queryByText("Envío gratis")).not.toBeInTheDocument();
    expect(screen.queryByText(/cuotas/)).not.toBeInTheDocument();
    expect(screen.queryByText("$1.500.000")).not.toBeInTheDocument();
  });
});
