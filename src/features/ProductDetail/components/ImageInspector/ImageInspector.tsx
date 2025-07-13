import { useRef, useState } from "react";

interface Props {
  pictures: { id: string; url: string }[];
  title: string;
}

const ImageInspector = ({ pictures, title }: Props) => {
  const [selImg, setSelImg] = useState<string>(pictures?.[0]?.url || "");
  const [zoomVisible, setZoomVisible] = useState(false);
  const [bgPosition, setBgPosition] = useState("0% 0%");
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });

  const zoomRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;
    setBgPosition(`${xPercent}% ${yPercent}%`);
    setLensPos({ x, y });
  };

  return (
    <div className="flex gap-4 relative">
      <div className="flex flex-col gap-2">
        {pictures.map((pic) => (
          <img
            key={pic.id}
            src={pic.url}
            alt="miniatura"
            className={`w-16 h-16 object-contain cursor-pointer border ${
              selImg === pic.url ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelImg(pic.url)}
          />
        ))}
      </div>

      <div
        className="w-[400px] h-[400px] border relative overflow-hidden cursor-zoom-in"
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

      {zoomVisible && (
        <div
          ref={zoomRef}
          className="absolute left-[460px] top-0 w-[400px] h-[400px] border bg-no-repeat bg-contain z-50"
          style={{
            backgroundImage: `url(${selImg})`,
            backgroundSize: "200%",
            backgroundPosition: bgPosition,
          }}
        />
      )}
    </div>
  );
};

export default ImageInspector;
