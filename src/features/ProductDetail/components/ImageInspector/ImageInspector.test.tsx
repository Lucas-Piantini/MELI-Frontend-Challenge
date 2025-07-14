// Pruebas del componente ImageInspector
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageInspector from "./ImageInspector";

const mockPictures = [
  { id: "1", url: "https://example.com/img1.jpg" },
  { id: "2", url: "https://example.com/img2.jpg" },
  { id: "3", url: "https://example.com/img3.jpg" },
];

describe("ImageInspector", () => {
  beforeEach(() => {
    // Mock dimensiones del contenedor para evitar Infinity%
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      width: 200,
      height: 200,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
  });

  it("renders thumbnails and main image", () => {
    render(
      <ImageInspector
        pictures={mockPictures}
        title="Test Product"
        onZoomChange={() => {}}
      />
    );

    const mainImage = screen.getByAltText("Test Product");
    expect(mainImage).toBeInTheDocument();

    mockPictures.forEach((_, i) => {
      const thumb = screen.getByAltText(`miniatura-${i}`);
      expect(thumb).toBeInTheDocument();
    });
  });

  it("changes selected image on thumbnail hover", () => {
    render(
      <ImageInspector
        pictures={mockPictures}
        title="Test Product"
        onZoomChange={() => {}}
      />
    );

    const secondThumb = screen.getByAltText("miniatura-1");
    fireEvent.mouseEnter(secondThumb);

    const mainImage = screen.getByAltText("Test Product");
    expect(mainImage).toHaveAttribute("src", mockPictures[1].url);
  });

  it("triggers zoom on mouse move and leave", () => {
    const onZoomChange = vi.fn();
    render(
      <ImageInspector
        pictures={mockPictures}
        title="Test Product"
        onZoomChange={onZoomChange}
      />
    );

    const mainImgContainer = screen.getByAltText("Test Product").parentElement!;
    fireEvent.mouseMove(mainImgContainer, { clientX: 100, clientY: 100 });

    expect(onZoomChange).toHaveBeenCalledWith(
      true,
      mockPictures[0].url,
      "50% 50%"
    );

    fireEvent.mouseLeave(mainImgContainer);
    expect(onZoomChange).toHaveBeenCalledWith(false, "", "0% 0%");
  });
});
