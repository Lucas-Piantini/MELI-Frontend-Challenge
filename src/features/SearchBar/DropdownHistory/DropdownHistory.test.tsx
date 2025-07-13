import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DropdownHistory from "./DropdownHistory";

// Mocks
const mockSearch = vi.fn();
const mockSetQuery = vi.fn();
const mockClear = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../../../stores/SearchStore", () => ({
  useSearchStore: () => ({
    recentSearches: ["zapatillas", "notebook"],
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

describe("DropdownHistory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders recent search terms", () => {
    render(
      <MemoryRouter>
        <DropdownHistory setIsFocused={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText("zapatillas")).toBeInTheDocument();
    expect(screen.getByText("notebook")).toBeInTheDocument();
  });

  it("handles click on a recent term", () => {
    const setIsFocusedMock = vi.fn();

    render(
      <MemoryRouter>
        <DropdownHistory setIsFocused={setIsFocusedMock} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("notebook"));

    expect(mockSetQuery).toHaveBeenCalledWith("notebook");
    expect(mockClear).toHaveBeenCalled();
    expect(mockSearch).toHaveBeenCalledWith("notebook");
    expect(mockNavigate).toHaveBeenCalledWith("/products/notebook");
    expect(setIsFocusedMock).toHaveBeenCalledWith(false);
  });
});
