import { useEffect } from "react";

interface Props {
  images: string[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ImageCarouselModal = ({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: Props) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        onNavigate(activeIndex > 0 ? activeIndex - 1 : images.length - 1);
      } else if (e.key === "ArrowRight") {
        onNavigate(activeIndex < images.length - 1 ? activeIndex + 1 : 0);
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, images.length, onNavigate, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="relative max-w-4xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl z-10"
        >
          ✕
        </button>

        {/* Flecha izquierda */}
        <button
          onClick={() =>
            onNavigate(activeIndex > 0 ? activeIndex - 1 : images.length - 1)
          }
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white text-3xl px-2 py-1 z-10 rounded hover:bg-opacity-60"
        >
          ‹
        </button>

        <img
          src={images[activeIndex]}
          alt={`imagen ${activeIndex}`}
          className="w-full max-h-[90vh] object-contain"
        />

        {/* Flecha derecha */}
        <button
          onClick={() =>
            onNavigate(activeIndex < images.length - 1 ? activeIndex + 1 : 0)
          }
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white text-3xl px-2 py-1 z-10 rounded hover:bg-opacity-60"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default ImageCarouselModal;
