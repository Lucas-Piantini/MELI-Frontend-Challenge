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

  useEffect(() => {
    if (query) {
      search(query, 0); // primera página
    }
  }, [query]);

  useEffect(() => {
    if (!isLoading && hasSearched && products.length === 0) {
      navigate("/products/not-found");
    }
  }, [isLoading, hasSearched, products.length, navigate]);

  const handlePageChange = (page: number) => {
    const newOffset = (page - 1) * paging.limit;
    search(query!, newOffset);
  };

  if (isLoading) return <ProductListSkeleton />;
  if (error) navigate("/error");

  return (
    <div className="w-full px-4 sm:px-0 m:max-w-4xl mx-auto">
      <ul className="mt-5">
        {products.map((product) => (
          <SearchProductCard key={product.id} product={product} />
        ))}
      </ul>

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
