// Pruebas del componente ImageCarouselModal
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageCarouselModal from "./ImageCarouselModal";

describe("ImageCarouselModal", () => {
  const images = ["img1.jpg", "img2.jpg", "img3.jpg"];
  const onClose = vi.fn();
  const onNavigate = vi.fn();

  beforeEach(() => {
    onClose.mockReset();
    onNavigate.mockReset();
  });

  it("renders the active image", () => {
    render(
      <ImageCarouselModal
        images={images}
        activeIndex={1}
        onClose={onClose}
        onNavigate={onNavigate}
      />
    );

    const img = screen.getByAltText("imagen 1");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "img2.jpg");
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <ImageCarouselModal
        images={images}
        activeIndex={0}
        onClose={onClose}
        onNavigate={onNavigate}
      />
    );

    fireEvent.click(screen.getByText("✕"));
    expect(onClose).toHaveBeenCalled();
  });

  it("navigates left on ‹ click", () => {
    render(
      <ImageCarouselModal
        images={images}
        activeIndex={1}
        onClose={onClose}
        onNavigate={onNavigate}
      />
    );

    fireEvent.click(screen.getByText("‹"));
    expect(onNavigate).toHaveBeenCalledWith(0);
  });

  it("navigates right on › click", () => {
    render(
      <ImageCarouselModal
        images={images}
        activeIndex={1}
        onClose={onClose}
        onNavigate={onNavigate}
      />
    );

    fireEvent.click(screen.getByText("›"));
    expect(onNavigate).toHaveBeenCalledWith(2);
  });

  it("navigates with ArrowLeft, ArrowRight and Escape keys", () => {
    render(
      <ImageCarouselModal
        images={images}
        activeIndex={1}
        onClose={onClose}
        onNavigate={onNavigate}
      />
    );

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(onNavigate).toHaveBeenCalledWith(0);

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(onNavigate).toHaveBeenCalledWith(2);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });
});
