import { useState } from "react";
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

  const visibleThumbs = pictures.slice(0, 7);
  const hiddenCount = pictures.length - 7;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;
    onZoomChange(true, selImg, `${xPercent}% ${yPercent}%`);
  };

  const handleMouseLeave = () => {
    onZoomChange(false, "", "0% 0%");
  };

  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  return (
    <div className="flex gap-4 relative flex-col md:flex-row">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2">
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

        {hiddenCount > 0 && (
          <div
            onClick={() => handleImageClick(7)}
            className="w-16 h-16 border border-gray-300 rounded bg-gray-100 text-sm font-medium text-gray-700 flex items-center justify-center cursor-pointer"
          >
            +{hiddenCount}
          </div>
        )}
      </div>

      {/* Main image */}
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
