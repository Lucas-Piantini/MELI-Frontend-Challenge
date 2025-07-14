// Pruebas del componente SearchBar
import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchBar } from "./SearchBar";

const mockSearch = vi.fn();
const mockClear = vi.fn();
const mockNavigate = vi.fn();

let mockQuery = "";

const mockSetQuery = vi.fn((value: string) => {
  mockQuery = value;
});

vi.mock("../../stores/SearchStore", () => ({
  useSearchStore: () => ({
    query: mockQuery,
    recentSearches: [],
    search: mockSearch,
    setQuery: mockSetQuery,
    clear: mockClear,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual: any = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("SearchBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockQuery = ""; // reset global mock state
  });

  it("renders the input and logo", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    expect(
      screen.getByPlaceholderText("Buscar productos, marcas y más...")
    ).toBeInTheDocument();

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  it("ignores input with invalid characters", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(
      "Buscar productos, marcas y más..."
    );

    fireEvent.change(input, { target: { value: "ropa$" } });

    expect(mockSetQuery).not.toHaveBeenCalled();
  });

  it("does not search on submit if query is too short", () => {
    mockQuery = "ab";

    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(
      "Buscar productos, marcas y más..."
    );

    fireEvent.submit(input);

    expect(mockSearch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("searches when valid query is submitted", () => {
    mockQuery = "zapatillas";

    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(
      "Buscar productos, marcas y más..."
    );

    fireEvent.submit(input);

    expect(mockClear).toHaveBeenCalled();
    expect(mockSearch).toHaveBeenCalledWith("zapatillas");
    expect(mockNavigate).toHaveBeenCalledWith("/products/zapatillas");
  });
});
