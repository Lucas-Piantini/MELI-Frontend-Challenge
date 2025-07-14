// Pruebas del componente ImageOverlay
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ImageOverlay from "./ImageOverlay";

describe("ImageOverlay", () => {
  const props = {
    imageUrl: "https://example.com/image.jpg",
    bgPosition: "50% 50%",
    visible: true,
  };

  it("renders the overlay with correct styles when visible", () => {
    const { container } = render(<ImageOverlay {...props} />);

    const overlay = container.firstChild as HTMLElement;
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle({
      backgroundImage: `url(${props.imageUrl})`,
      backgroundSize: "200%",
      backgroundPosition: props.bgPosition,
      height: "500px",
    });
  });

  it("returns null when visible is false", () => {
    const { container } = render(<ImageOverlay {...props} visible={false} />);

    expect(container.firstChild).toBeNull();
  });

  it("applies the ref when provided", () => {
    const ref = { current: null };
    render(<ImageOverlay {...props} zoomRef={ref} />);

    expect(ref.current).not.toBeNull();
  });
});
