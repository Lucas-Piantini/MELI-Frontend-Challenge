import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ProductDetail } from "./ProductDetailsPage.types";
import { fetchProductById } from "../../services/productService";
import ProductDetailSkeleton from "./components/ProductDetailSkeleton/ProductDetailSkeleton";
import ImageInspector from "./components/ImageInspector/ImageInspector";
import ProductDescription from "./components/ProductDescription/ProductDescription";
import MonetaryDetails from "./components/MonetaryDetails/MonetaryDetails";
import ImageZoomOverlay from "../ProductDetail/components/ImageOverlay/ImageOverlay";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [bgPosition, setBgPosition] = useState("0% 0%");
  const [selImg, setSelImg] = useState<string>("");
  const zoomRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        if (!id) throw new Error();
        const data = await fetchProductById(id);
        setProduct(data);
        setSelImg(data.pictures?.[0]?.url || "");
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
      <div className="flex flex-col lg:flex-row gap-6 relative">
        <div>
          <ImageInspector
            pictures={product.pictures}
            title={product.title}
            onZoomChange={(visible, img, pos) => {
              setZoomVisible(visible);
              setSelImg(img);
              setBgPosition(pos);
            }}
          />
          <ProductDescription
            description={product.description.plain_text}
            attributes={product.attributes}
          />
        </div>

        {zoomVisible ? (
          <ImageZoomOverlay
            imageUrl={selImg}
            visible={zoomVisible}
            bgPosition={bgPosition}
            zoomRef={zoomRef}
          />
        ) : (
          <MonetaryDetails {...product} />
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
