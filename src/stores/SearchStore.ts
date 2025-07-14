// Estado global de búsqueda usando Zustand
import { create } from "zustand";
import { fetchFilteredProducts } from "../services/productService";
import type { SearchState } from "./SearchStore.types";

// Hook personalizado que expone el estado y acciones relacionadas con la búsqueda
export const useSearchStore = create<SearchState>((set, get) => {
  // Carga el historial de búsquedas desde localStorage
  const storedSearches = localStorage.getItem("recentSearches");
  const initialRecentSearches = storedSearches
    ? JSON.parse(storedSearches)
    : [];

  return {
    // Estado inicial
    query: "", // Texto actual en la barra de búsqueda
    products: [], // Lista de productos obtenidos
    isLoading: false, // Indica si se está cargando una búsqueda
    error: null, // Almacena mensaje de error si ocurre
    hasSearched: false, // Marca si ya se realizó una búsqueda
    recentSearches: initialRecentSearches, // Historial de búsquedas previas

    // Paginación
    paging: {
      total: 0, // Total de productos en los resultados
      offset: 0, // Posición actual en la paginación
      limit: 6, // Cantidad de resultados por página
    },

    // Actualiza el texto de búsqueda
    setQuery: (value: string) => set({ query: value }),

    // Agrega una búsqueda al historial (guardada en localStorage)
    addRecentSearch: (query: string) => {
      const current = get().recentSearches;
      // Evita duplicados y limita el historial a 6 entradas
      const updated = [query, ...current.filter((q) => q !== query)].slice(
        0,
        6,
      );
      set({ recentSearches: updated });
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    },

    // Ejecuta una búsqueda de productos
    search: async (query: string, offset = 0) => {
      const { limit } = get().paging;

      // Resetea estado antes de buscar
      set({
        isLoading: true,
        error: null,
        products: [],
        hasSearched: false,
        query,
        paging: { ...get().paging, offset },
      });

      try {
        // Llama al servicio que devuelve productos mockeados
        // Aquí podrías llamar a una función de analytics (ej: logSearchEvent(query))
        const data = await fetchFilteredProducts(query, offset, limit);

        set({
          products: data.results,
          paging: data.paging,
          isLoading: false,
          hasSearched: true,
          // error: "Ocurrió un error", // Descomentar para probar errores
        });

        // Guarda búsqueda en historial
        get().addRecentSearch(query);
      } catch (err) {
        // Manejo de errores en la búsqueda
        set({
          error: "Ocurrió un error",
          isLoading: false,
          hasSearched: true,
        });
      }
    },

    // Limpia el estado de búsqueda
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
