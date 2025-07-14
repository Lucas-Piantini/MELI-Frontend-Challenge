// Botón promocional
const SearchbarPromo = () => {
  return (
    <button
      onClick={() =>
        window.open(
          "https://www.mercadolibre.com.ar/suscripciones/melimas#origin=banner-menu",
          "_blank"
        )
      }
      className="flex items-center ml-10"
    >
      <img src="/images/promo.png" alt="promo" className="w-[340px] h-auto" />
    </button>
  );
};

export default SearchbarPromo;
