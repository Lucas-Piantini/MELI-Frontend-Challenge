const EmptyScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-center  px-4">
      <img
        src="/images/not-found.png"
        alt="Sin resultados"
        className="w-32 h-32 mb-6"
      />
      <h2 className="text-2xl font-semibold mb-2">
        No encontramos lo que buscás
      </h2>
      <p className="text-sm text-gray-600">
        Probá con otro término de búsqueda o revisá si escribiste bien.
      </p>
    </div>
  );
};

export default EmptyScreen;
