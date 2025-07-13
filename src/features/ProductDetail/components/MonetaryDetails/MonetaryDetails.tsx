import StarRating from "../../../StarRating/StarRating";
import MonetaryDetailsProps from "./MonetaryDetails.types";

const MonetaryDetails = ({
  title,
  price,
  original_price,
  condition,
  installments,
  shipping,
  seller_address,
  warranty,
  sold_quantity,
  reviews,
}: MonetaryDetailsProps) => {
  return (
    <div className="flex-1 border p-6 rounded min-w-[35%]">
      <p className="text-sm text-gray-500 capitalize mb-1">
        {condition === "new" ? "Nuevo" : "Usado"} | {sold_quantity} vendidos
      </p>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      {reviews?.rating_average && (
        <StarRating rating={reviews.rating_average} total={reviews.total} />
      )}
      <div className="flex flex-col ">
        {original_price && (
          <span className="text-sm line-through text-gray-500">
            ${original_price.toLocaleString("es-AR")}
          </span>
        )}
        <span className="text-3xl text-green-600 font-semibold">
          ${price.toLocaleString("es-AR")}
        </span>
      </div>
      {installments && (
        <p className="text-sm text-green-600 mb-2">
          mismo precio en {installments.quantity} cuotas de $
          {installments.amount.toLocaleString("es-AR")}
        </p>
      )}
      {shipping.free_shipping && (
        <p className="text-sm text-green-600 font-medium mb-2">Envío gratis</p>
      )}
      <p className="text-sm text-gray-700 mb-2">
        Ubicación del vendedor: {seller_address.city.name},{" "}
        {seller_address.state.name}
      </p>
      <p className="text-sm text-gray-700 mb-4">{warranty}</p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4 hover:bg-blue-600">
        Comprar ahora
      </button>
      <button className="text-meliBlue py-2 px-4 rounded w-full mt-4 bg-gray-200 hover:bg-gray-300">
        Agregar al carrito
      </button>
    </div>
  );
};

export default MonetaryDetails;
