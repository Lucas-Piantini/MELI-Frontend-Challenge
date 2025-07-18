// Funciones para obtener productos del mock
import type { Product } from "../types/product";
import type { ProductDetail } from "../features/ProductDetail/ProductDetailsPage.types";

// Busca el listado de productos segun la busqueda y la pagina
export const fetchFilteredProducts = async (
  query: string,
  offset = 0,
  limit = 4,
): Promise<{
  results: Product[];
  paging: { total: number; offset: number; limit: number };
}> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // delay artificial

  const res = await fetch("/mock/products.json");

  if (!res.ok) {
    throw new Error("Error al cargar productos");
  }

  const data: { results: Product[] } = await res.json();

  const filtered = data.results.filter((p: Product) =>
    p.title.toLowerCase().includes(query.toLowerCase()),
  );

  const paginated = filtered.slice(offset, offset + limit);

  return {
    results: paginated,
    paging: {
      total: filtered.length,
      offset,
      limit,
    },
  };
};

// Trae los detalles del producto
export const fetchProductById = async (id: string): Promise<ProductDetail> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // delay artificial
  const res = await fetch(`/mock/${id}.json`);

  if (!res.ok) {
    throw new Error("Producto no encontrado");
  }

  const data: ProductDetail = await res.json();
  return data;
};
