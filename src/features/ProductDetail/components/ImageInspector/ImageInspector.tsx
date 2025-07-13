import { useRef, useState, useEffect } from "react";

interface Props {
  pictures: { id: string; url: string }[];
  title: string;
  onZoomChange?: (
    visible: boolean,
    currentImage: string,
    bgPosition: string
  ) => void;
}

const ImageInspector = ({ pictures = [], title, onZoomChange }: Props) => {
  const [selImg, setSelImg] = useState<string>(pictures?.[0]?.url || "");
  const [zoomVisible, setZoomVisible] = useState(false);
  const [bgPosition, setBgPosition] = useState("0% 0%");
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });

  const zoomRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;
    setBgPosition(`${xPercent}% ${yPercent}%`);
    setLensPos({ x, y });
  };

  // Notificar al padre
  useEffect(() => {
    onZoomChange?.(zoomVisible, selImg, bgPosition);
  }, [zoomVisible, selImg, bgPosition]);

  return (
    <div className="flex gap-4 relative">
      {/* Miniaturas */}
      <div className="flex flex-col gap-2">
        {pictures.slice(0, 7).map((pic) => (
          <img
            key={pic.id}
            src={pic.url}
            alt="miniatura"
            className={`w-16 h-16 object-contain cursor-pointer border ${
              selImg === pic.url ? "border-blue-500" : "border-gray-300"
            }`}
            onMouseEnter={() => setSelImg(pic.url)}
          />
        ))}
        {pictures.length > 7 && (
          <div className="w-16 h-16 border border-gray-300 bg-gray-100 text-sm font-medium text-gray-700 flex items-center justify-center">
            +{pictures.length - 7}
          </div>
        )}
      </div>

      {/* Imagen principal */}
      <div
        className="h-[500px] relative overflow-hidden cursor-zoom-in w-full bg-gray-100 rounded-md"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setZoomVisible(true)}
        onMouseLeave={() => setZoomVisible(false)}
      >
        <img
          src={selImg}
          alt={title}
          className="w-full h-full object-contain"
        />
        {zoomVisible && (
          <div
            ref={lensRef}
            className="absolute w-20 h-20 shimmer bg-opacity-30 border border-gray-500 pointer-events-none"
            style={{
              top: lensPos.y - 40,
              left: lensPos.x - 40,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageInspector;
