// Página de detalle de producto
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ProductDetail } from "./ProductDetailsPage.types";
import { fetchProductById } from "../../services/productService";
import {
  ImageInspector,
  ImageOverlay,
  ProductDescription,
  ProductDetailSkeleton,
  MonetaryDetails,
} from "./components";

//  En este componente se pueden juntar analytics si el usuario clickea sobre las fotos
//  o si se hace zoom en la foto, o si agrega al carrito, etc.

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [bgPosition, setBgPosition] = useState("0% 0%");
  const [selImg, setSelImg] = useState<string>("");
  const zoomRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  // Carga el producto al montar el componente
  // Si no se encuentra el producto, redirige a la pantalla de error
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
          {/* Imagen principal del producto */}
          <ImageInspector
            pictures={product.pictures}
            title={product.title}
            onZoomChange={(visible, img, pos) => {
              setZoomVisible(visible);
              setSelImg(img);
              setBgPosition(pos);
            }}
          />
          {/* Parte inferior con textos sobre el producto */}
          <ProductDescription
            description={product.description.plain_text}
            attributes={product.attributes}
          />
        </div>

        {/* Si se esta hoovereando la foto principal se muestra una dupla con zoom, si no se muestran los detalles de compra */}
        {zoomVisible ? (
          <ImageOverlay
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
