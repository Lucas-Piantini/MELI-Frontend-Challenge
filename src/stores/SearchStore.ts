// Estado global de búsqueda
import { create } from "zustand";
import { fetchFilteredProducts } from "../services/productService";
import type { SearchState } from "./SearchStore.types";

export const useSearchStore = create<SearchState>((set, get) => {
  const storedSearches = localStorage.getItem("recentSearches");
  const initialRecentSearches = storedSearches
    ? JSON.parse(storedSearches)
    : [];

  return {
    query: "",
    products: [],
    isLoading: false,
    error: null,
    hasSearched: false,
    recentSearches: initialRecentSearches,
    paging: {
      total: 0,
      offset: 0,
      limit: 6,
    },

    setQuery: (value: string) => set({ query: value }),

    addRecentSearch: (query: string) => {
      const current = get().recentSearches;
      const updated = [query, ...current.filter((q) => q !== query)].slice(
        0,
        6
      );
      set({ recentSearches: updated });
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    },

    search: async (query: string, offset = 0) => {
      const { limit } = get().paging;

      set({
        isLoading: true,
        error: null,
        products: [],
        hasSearched: false,
        query,
        paging: { ...get().paging, offset },
      });

      try {
        const data = await fetchFilteredProducts(query, offset, limit);
        set({
          products: data.results,
          paging: data.paging,
          isLoading: false,
          hasSearched: true,
          //error: "Ocurrió un error", <-- Descomentar si se quiere simular un error
        });
        get().addRecentSearch(query);
      } catch (err) {
        set({
          error: "Ocurrió un error",
          isLoading: false,
          hasSearched: true,
        });
      }
    },

    clear: () =>
      set({
        query: "",
        products: [],
        error: null,
        isLoading: false,
        hasSearched: false,
        paging: { total: 0, offset: 0, limit: 4 },
      }),
  };
});
