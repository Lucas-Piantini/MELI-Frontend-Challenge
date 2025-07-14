// Pruebas del componente HomeScreen
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomeScreen from "./HomeScreen";

describe("HomeScreen", () => {
  it("renders the swiper with all banner images", async () => {
    render(<HomeScreen />);

    for (let i = 0; i < 3; i++) {
      const image = await screen.findByAltText(`Banner ${i}`);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", `images/homeBanner${i + 1}.png`);
    }
  });

  it("renders the Swiper container", () => {
    const { container } = render(<HomeScreen />);
    const swiperElement = container.querySelector(".swiper");
    expect(swiperElement).toBeInTheDocument();
  });
});
