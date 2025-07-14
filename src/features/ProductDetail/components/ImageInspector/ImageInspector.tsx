import { useEffect, useState } from "react";
import ImageCarouselModal from "../ImageCarouselModal/ImageCarouselModal";

interface Props {
  pictures: { id: string; url: string }[];
  title: string;
  onZoomChange: (visible: boolean, img: string, pos: string) => void;
}

const ImageInspector = ({ pictures = [], title, onZoomChange }: Props) => {
  const [selImg, setSelImg] = useState(pictures?.[0]?.url || "");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbLimit, setThumbLimit] = useState(7);

  // Ajusta cuántas miniaturas mostrar según el ancho de pantalla
  useEffect(() => {
    const updateThumbLimit = () => {
      setThumbLimit(window.innerWidth < 640 ? 4 : 7); // sm:640px
    };

    updateThumbLimit();
    window.addEventListener("resize", updateThumbLimit);
    return () => window.removeEventListener("resize", updateThumbLimit);
  }, []);

  const visibleThumbs = pictures.slice(0, thumbLimit);
  const hiddenCount = pictures.length - thumbLimit;

  // Maneja el movimiento del mouse para el zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;
    onZoomChange(true, selImg, `${xPercent}% ${yPercent}%`);
  };

  // Maneja el mouse salir de la imagen para desactivar el zoom
  const handleMouseLeave = () => {
    onZoomChange(false, "", "0% 0%");
  };

  // Maneja el clic en las miniaturas para abrir el modal
  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  return (
    <div className="flex gap-4 relative flex-col md:flex-row">
      {/* Thumbnails  en fila o culumna segun tamaño de pantalla*/}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        {visibleThumbs.map((pic, index) => (
          <img
            key={pic.id}
            src={pic.url}
            alt={`miniatura-${index}`}
            className={`w-16 h-16 object-contain cursor-pointer border ${
              selImg === pic.url ? "border-blue-500" : "border-gray-300"
            }`}
            onMouseEnter={() => setSelImg(pic.url)}
            onClick={() => handleImageClick(index)}
          />
        ))}

        {/* Botón para ver más miniaturas si hay más de las que se muestran */}
        {hiddenCount > 0 && (
          <div
            onClick={() => handleImageClick(thumbLimit)}
            className="w-16 h-16 border border-gray-300 rounded bg-gray-100 text-sm font-medium text-gray-700 flex items-center justify-center cursor-pointer"
          >
            +{hiddenCount}
          </div>
        )}
      </div>

      {/* Imagen principal */}
      <div
        className="relative overflow-hidden cursor-zoom-in bg-gray-100 rounded-md w-full h-[300px] md:h-[500px]"
        onMouseMove={handleMouseMove}
        onMouseEnter={(e) => handleMouseMove(e)}
        onMouseLeave={handleMouseLeave}
        onClick={() =>
          handleImageClick(pictures.findIndex((p) => p.url === selImg))
        }
      >
        <img
          src={selImg}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Modal de fotos */}
      {modalOpen && (
        <ImageCarouselModal
          images={pictures.map((p) => p.url)}
          activeIndex={activeIndex}
          onClose={() => setModalOpen(false)}
          onNavigate={setActiveIndex}
        />
      )}
    </div>
  );
};

export default ImageInspector;
