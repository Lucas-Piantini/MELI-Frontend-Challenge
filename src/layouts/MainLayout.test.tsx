import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./MainLayout";

// ── Mock SearchBar ─────────────────────────────────────────
vi.mock("../features/SearchBar/SearchBar", () => ({
  SearchBar: () => <div data-testid="mock-searchbar">SearchBar</div>,
}));

describe("MainLayout", () => {
  it("renders SearchBar and outlet content", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<MainLayout />}>
            {/* ruta hija para el outlet */}
            <Route
              path="/"
              element={<div data-testid="child-page">Child Page</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // 1. SearchBar mock presente
    expect(screen.getByTestId("mock-searchbar")).toBeInTheDocument();

    // 2. Contenido del Outlet presente
    expect(screen.getByTestId("child-page")).toBeInTheDocument();
  });
});
