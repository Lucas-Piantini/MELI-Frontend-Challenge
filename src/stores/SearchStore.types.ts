import { Product } from "../types/product";

export interface Paging {
  total: number;
  offset: number;
  limit: number;
}

export interface SearchState {
  query: string;
  products: Product[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  recentSearches: string[];
  paging: Paging;
  search: (query: string, offset?: number) => Promise<void>;
  setQuery: (value: string) => void;
  clear: () => void;
  addRecentSearch: (query: string) => void;
}

