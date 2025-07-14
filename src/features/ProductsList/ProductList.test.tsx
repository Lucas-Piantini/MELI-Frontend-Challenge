// Pruebas del componente ProductList
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import ProductsList from "./ProductsList";
import { useSearchStore } from "../../stores/SearchStore";

// Mock del store Zustand
vi.mock("../../stores/SearchStore", async () => {
  const actual = await vi.importActual("../../stores/SearchStore");
  return {
    ...actual,
    useSearchStore: vi.fn(),
  };
});

// Mock de react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ query: "test" }),
  };
});

const mockedUseSearchStore = useSearchStore as unknown as Mock;

describe("ProductsList", () => {
  const mockSearch = vi.fn();

  const defaultStore = {
    products: [],
    isLoading: false,
    search: mockSearch,
    paging: { total: 0, offset: 0, limit: 10 },
    hasSearched: false,
    error: null,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders skeleton while loading", () => {
    mockedUseSearchStore.mockReturnValue({
      ...defaultStore,
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={["/products/test"]}>
        <Routes>
          <Route path="/products/:query" element={<ProductsList />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("product-list-skeleton")).toBeInTheDocument();
  });

  it("navigates to not-found when no products are found", async () => {
    mockedUseSearchStore.mockReturnValue({
      ...defaultStore,
      isLoading: false,
      hasSearched: true,
      products: [],
    });

    render(
      <MemoryRouter initialEntries={["/products/test"]}>
        <Routes>
          <Route path="/products/:query" element={<ProductsList />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/products/not-found");
    });
  });

  it("renders products and paginator", () => {
    mockedUseSearchStore.mockReturnValue({
      ...defaultStore,
      hasSearched: true,
      products: [
        {
          id: "1",
          title: "Producto Test",
          price: 1000,
          thumbnail: "/img.jpg",
          condition: "new",
        },
      ],
    });

    render(
      <MemoryRouter initialEntries={["/products/test"]}>
        <Routes>
          <Route path="/products/:query" element={<ProductsList />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Producto Test")).toBeInTheDocument();
  });
});
