// Capa oscura sobre la imagen
import React from "react";

interface Props {
  imageUrl: string;
  visible: boolean;
  bgPosition: string;
  zoomRef?: React.RefObject<HTMLDivElement | null>;
}

const ImageOverlay = ({ imageUrl, visible, bgPosition, zoomRef }: Props) => {
  if (!visible) return null;

  return (
    <div
      ref={zoomRef}
      className="flex-1 min-w-[35%] border p-4 rounded bg-no-repeat bg-contain bg-white shadow-inner "
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "200%",
        backgroundPosition: bgPosition,
        height: 500,
      }}
    />
  );
};

export default ImageOverlay;
