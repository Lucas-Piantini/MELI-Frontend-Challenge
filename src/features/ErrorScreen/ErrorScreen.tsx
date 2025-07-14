// Pantalla de error
const ErrorScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-center px-4">
      <img
        src="/images/error.png"
        alt="Error inesperado"
        className="w-48 h-48 mb-6"
      />
      <h2 className="text-2xl font-semibold mb-2">Hubo un error inesperado</h2>
      <p className="text-sm text-gray-600">
        Por favor, intentá nuevamente más tarde o contactá al soporte si el
        problema persiste.
      </p>
    </div>
  );
};

export default ErrorScreen;
