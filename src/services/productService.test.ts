// Pruebas del componente productService
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchFilteredProducts, fetchProductById } from "./productService";
import type { Product } from "../types/product";
import type { ProductDetail } from "../features/ProductDetail/ProductDetailsPage.types";

const mockProducts: Product[] = [
  {
    id: "MLA1",
    title: "Zapatillas Nike",
    price: 1000,
    currency_id: "ARS",
    condition: "new",
    thumbnail: "/img.jpg",
    shipping: { free_shipping: true },
  },
  {
    id: "MLA2",
    title: "Remera Adidas",
    price: 500,
    currency_id: "ARS",
    condition: "new",
    thumbnail: "/img2.jpg",
    shipping: { free_shipping: false },
  },
];

const mockDetail: ProductDetail = {
  id: "MLA123",
  title: "Zapatillas Nike",
  price: 1000,
  currency_id: "ARS",
  condition: "new",
  pictures: [{ id: "1", url: "/img.jpg" }],
  description: { plain_text: "Descripción" },
  attributes: [],
  shipping: { free_shipping: true },
  sold_quantity: 5,
  original_price: 1200,
  available_quantity: 10,
  permalink: "https://www.mercadolibre.com.ar/zapatillas-nike/p/MLA123",
  seller_address: {
    city: { name: "Buenos Aires" },
    state: { name: "Buenos Aires" },
  },
};

global.fetch = vi.fn();

describe("productService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchFilteredProducts should return filtered and paginated results", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockProducts }),
    });

    const result = await fetchFilteredProducts("nike", 0, 2);
    expect(result.results.length).toBe(1);
    expect(result.results[0].title).toBe("Zapatillas Nike");
    expect(result.paging.total).toBe(1);
  });

  it("fetchProductById should return product detail data", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockDetail,
    });

    const result = await fetchProductById("MLA123");
    expect(result.id).toBe("MLA123");
    expect(result.title).toBe("Zapatillas Nike");
  });

  it("fetchProductById should throw error on fetch fail", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchProductById("invalid-id")).rejects.toThrow(
      "Producto no encontrado"
    );
  });
});
