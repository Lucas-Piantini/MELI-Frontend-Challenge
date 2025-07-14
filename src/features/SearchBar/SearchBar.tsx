// Barra de búsqueda
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchStore } from "../../stores/SearchStore";
import SearchbarPromo from "./Components/SearchbarPromo";
import DropdownHistory from "./DropdownHistory/DropdownHistory";
import { MagnifierIcon } from "../../Components/Icons";

const ALLOWED_REGEX = /^[a-zA-Z0-9\s\-_.áéíóúÁÉÍÓÚñÑ]*$/;

export const SearchBar = () => {
  const navigate = useNavigate();
  const { search, setQuery, query, clear, recentSearches } = useSearchStore();

  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!ALLOWED_REGEX.test(value)) return;

    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const trimmed = value.trim();
      if (trimmed.length < 3) return;

      clear();
      search(trimmed);
      navigate(`/products/${trimmed}`);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();

    if (!ALLOWED_REGEX.test(trimmed) || trimmed.length < 3) return;
    //se limpia el focus para evitar que el dropdown se quede abierto
    setIsFocused(false);
    clear();
    search(trimmed);
    navigate(`/products/${trimmed}`);
  };

  return (
    <header className="min-h-[60px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 w-full bg-meliYellow py-3 overflow-visible"
      >
        <Link to="/" onClick={() => clear()} className="mr-10">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="ml-5 w-[134px] h-auto object-contain"
          />
        </Link>

        <div className="relative w-full max-w-[580px] sm:max-w-[400px] md:flex-1">
          <input
            type="text"
            placeholder="Buscar productos, marcas y más..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="shadow-sm w-full px-4 py-2 border border-transparent focus:outline-none focus:ring-1 focus:ring-[#3483fa]"
          />

          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <MagnifierIcon className="w-4 h-4 text-gray-500" />
          </button>

          {isFocused && recentSearches.length > 0 && (
            <DropdownHistory setIsFocused={setIsFocused} />
          )}
        </div>

        <div className="hidden md:block">
          <SearchbarPromo />
        </div>
      </form>
    </header>
  );
};
