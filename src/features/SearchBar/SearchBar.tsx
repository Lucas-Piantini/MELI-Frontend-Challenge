// Barra de búsqueda principal que incluye input con historial y navegación
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchStore } from "../../stores/SearchStore";
import SearchbarPromo from "./Components/SearchbarPromo";
import DropdownHistory from "./DropdownHistory/DropdownHistory";
import { MagnifierIcon } from "../../Components/Icons";

// Regex que define los caracteres válidos para ingresar en la búsqueda
const ALLOWED_REGEX = /^[a-zA-Z0-9\s\-_.áéíóúÁÉÍÓÚñÑ]*$/;

export const SearchBar = () => {
  const navigate = useNavigate();
  const { search, setQuery, query, clear, recentSearches } = useSearchStore();

  // Referencia usada para implementar el debounce
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Estado para controlar si el input está enfocado (y mostrar el dropdown)
  const [isFocused, setIsFocused] = React.useState(false);

  // Maneja el cambio de texto en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Si el valor contiene caracteres inválidos, se ignora
    if (!ALLOWED_REGEX.test(value)) return;

    // Actualiza el valor de búsqueda en el estado global
    setQuery(value);

    // Cancela cualquier búsqueda pendiente
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Inicia un nuevo debounce para evitar búsquedas en cada tecla
    debounceRef.current = setTimeout(() => {
      const trimmed = value.trim();
      if (trimmed.length < 3) return;

      clear(); // Limpia estado previo de búsqueda
      search(trimmed); // Ejecuta nueva búsqueda
      navigate(`/products/${trimmed}`); // Redirige al resultado
    }, 500);
  };

  // Maneja el envío del formulario (ej. al presionar Enter o el botón)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();

    // Validación de input
    if (!ALLOWED_REGEX.test(trimmed) || trimmed.length < 3) return;

    // Cierra el dropdown de historial
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
        {/* Logo que redirige al home y limpia el estado */}
        <Link to="/" onClick={() => clear()} className="mr-10">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="ml-5 w-[134px] h-auto object-contain"
          />
        </Link>

        {/* Input de búsqueda con botón de lupa y dropdown de historial */}
        <div className="relative w-full max-w-[580px] sm:max-w-[400px] md:flex-1">
          <input
            type="text"
            placeholder="Buscar productos, marcas y más..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay para permitir click en el dropdown
            className="shadow-sm w-full px-4 py-2 border border-transparent focus:outline-none focus:ring-1 focus:ring-[#3483fa]"
          />

          {/* Botón de envío */}
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <MagnifierIcon className="w-4 h-4 text-gray-500" />
          </button>

          {/* Historial de búsquedas recientes */}
          {isFocused && recentSearches.length > 0 && (
            <DropdownHistory setIsFocused={setIsFocused} />
          )}
        </div>

        {/* Promociones del buscador en escritorio */}
        <div className="hidden md:block">
          <SearchbarPromo />
        </div>
      </form>
    </header>
  );
};
