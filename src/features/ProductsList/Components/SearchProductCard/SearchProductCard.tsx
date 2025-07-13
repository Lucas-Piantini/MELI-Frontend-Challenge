import { Link } from "react-router-dom";
import type { Product } from "../../../../types/product";
import StarRating from "../../../../Components/StarRating/StarRating";

const ProductCard = ({ product }: { product: Product }) => {
  const {
    id,
    title,
    price,
    thumbnail,
    reviews,
    shipping,
    original_price,
    discount,
    installments,
    seller,
    official_store_name,
    variations,
  } = product;

  return (
    <li className="p-4 bg-white shadow hover:shadow-md transition border max-w-full sm:max-w-[800px] mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={thumbnail}
          alt={title}
          className="w-full sm:w-[196px] h-[196px] object-contain mx-auto sm:mx-0"
        />

        <div className="flex-1 space-y-1">
          {official_store_name && (
            <span className="text-xs px-2 py-0.5 bg-gray-950 rounded font-semibold text-white">
              {official_store_name.toUpperCase()}
            </span>
          )}

          <Link
            to={`/details/${id}`}
            className="block text-lg font-semibold text-gray-800 hover:underline"
          >
            {title}
          </Link>

          {seller && <p className="text-sm text-gray-500">Por {seller}</p>}

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col space-y-1">
              {original_price && (
                <span className="text-sm text-gray-400 line-through">
                  ${original_price.toLocaleString("es-AR")}
                </span>
              )}

              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${price.toLocaleString("es-AR")}
                </span>
                {discount && (
                  <span className="text-green-600 text-sm font-semibold">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {installments && (
                <p className="text-sm text-green-700">
                  Mismo precio en {installments.quantity} cuotas de $
                  {installments.amount.toLocaleString("es-AR")}
                </p>
              )}

              {shipping?.free_shipping && (
                <p className="text-sm text-green-600 font-medium">
                  Envío gratis
                </p>
              )}
            </div>

            {/* Derecha: rating y variaciones */}
            <div className="flex flex-col items-end space-y-1">
              {reviews?.rating_average && (
                <StarRating
                  rating={reviews.rating_average}
                  total={reviews.total}
                />
              )}

              {variations && variations.length > 1 && (
                <p className="text-sm text-gray-500 text-right">
                  Disponible en {variations.length} colores
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
