import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ProductDetail } from "../../types/product";
import { fetchProductById } from "../../services/productService";
import ProductDetailSkeleton from "./components/ProductDetailSkeleton/ProductDetailSkeleton";
import ImageInspector from "./components/ImageInspector/ImageInspector";
import ProductDescription from "./components/ProductDescription/ProductDescription";
import MonetaryDetails from "./components/MonetaryDetails/MonetaryDetails";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        if (!id) throw new Error();
        const data = await fetchProductById(id);
        setProduct(data);
      } catch {
        navigate(`/error`);
      } finally {
        setLoading(false);
      }
    };
    get();
  }, [id]);

  if (loading) return <ProductDetailSkeleton />;
  if (!product) return null;

  return (
    <div className="mt-8 p-6 max-w-6xl mx-auto bg-white rounded">
      <div className="flex gap-6 relative">
        <div>
          <ImageInspector pictures={product.pictures} title={product.title} />
          <ProductDescription
            description={product.description.plain_text}
            attributes={product.attributes}
          />
        </div>

        <MonetaryDetails {...product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
