// Pruebas del componente ProductDetailsPage
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductDetailPage from "./ProductDetailPage";
import * as service from "../../services/productService";

// 🧪 mock embebido directamente
const mockProduct = {
  id: "MLA998877665",
  title: "Apple iPhone 13 (128 GB) - Medianoche",
  price: 2509380.59,
  original_price: 3023244.99,
  currency_id: "ARS",
  available_quantity: 3,
  sold_quantity: 5,
  condition: "new",
  permalink: "https://www.mercadolibre.com.ar/p/MLA998877665",
  pictures: [
    {
      id: "1",
      url: "https://http2.mlstatic.com/D_NQ_NP_2X_973345-MLA47781591382_102021-F.webp",
    },
  ],
  installments: {
    quantity: 9,
    amount: 278820.07,
    rate: 0,
    currency_id: "ARS",
  },
  shipping: {
    free_shipping: true,
    mode: "me2",
    logistic_type: "fulfillment",
    store_pick_up: false,
  },
  seller_address: {
    city: {
      name: "CABA",
    },
    state: {
      name: "Buenos Aires",
    },
  },
  attributes: [
    {
      id: "BRAND",
      name: "Marca",
      value_name: "Apple",
    },
  ],
  warranty: "Garantía del vendedor: 3 meses",
  description: {
    plain_text:
      "El iPhone 14 viene con el sistema de dos cámaras más impresionante en un iPhone 14, para que tomes fotos espectaculares con mucha o poca luz. Y te da más tranquilidad gracias a una funcionalidad de seguridad que salva vidas.",
  },
  reviews: {
    rating_average: 5.0,
    total: 1,
  },
};

vi.mock("../../services/productService");

describe("ProductDetailPage", () => {
  const fetchProductById = vi.spyOn(service, "fetchProductById");

  beforeEach(() => {
    fetchProductById.mockReset();
  });

  it("renders product details after loading", async () => {
    fetchProductById.mockResolvedValue(mockProduct);

    render(
      <MemoryRouter initialEntries={["/products/MLA998877665"]}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/error" element={<div>Error screen</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Espera por texto del producto
    const description = await screen.findByText(
      /El iPhone 14 viene con el sistema de dos cámaras más impresionante/i
    );
    expect(description).toBeInTheDocument();

    expect(screen.getByText(/nuevo/i)).toBeInTheDocument();
    expect(
      screen.getByText("Apple iPhone 13 (128 GB) - Medianoche")
    ).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(
      screen.getByText("Garantía del vendedor: 3 meses")
    ).toBeInTheDocument();
  });
});
