// Lista de productos
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchStore } from "../../stores/SearchStore";
import SearchProductCard from "./Components/SearchProductCard/SearchProductCard";
import Paginator from "../../Components/Paginator/Paginator";
import ProductListSkeleton from "./Components/ProductListSkeleton/ProductListSkeleton";

const ProductsList = () => {
  const navigate = useNavigate();
  const { query } = useParams();
  const { products, isLoading, search, paging, hasSearched, error } =
    useSearchStore();

  // si el URL tiene una query busca el producto
  useEffect(() => {
    if (query) {
      search(query, 0); // primera página
    }
  }, [query]);

  // si no hay producto se navega a la pantalla de no encontrado
  useEffect(() => {
    if (!isLoading && hasSearched && products.length === 0) {
      navigate("/products/not-found");
    }
  }, [isLoading, hasSearched, products.length, navigate]);

  // hace la busqueda al cambiar el n° de la pagina
  const handlePageChange = (page: number) => {
    const newOffset = (page - 1) * paging.limit;
    search(query!, newOffset);
  };

  // carga el skeleton mientras trae los productos
  if (isLoading) return <ProductListSkeleton />;
  if (error) navigate("/error");

  return (
    <div className="w-full px-4 sm:px-0 m:max-w-4xl mx-auto">
      {/* Mapea el listado de productos */}
      <ul className="mt-5">
        {products.map((product) => (
          <SearchProductCard key={product.id} product={product} />
        ))}
      </ul>

      {/* Contador de páginas */}
      <div className="mt-6">
        <Paginator
          total={paging.total}
          offset={paging.offset}
          limit={paging.limit}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductsList;
