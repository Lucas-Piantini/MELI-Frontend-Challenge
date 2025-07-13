import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchbarPromo from "./SearchbarPromo";

describe("SearchbarPromo", () => {
  it("renders promo image and opens link on click", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    render(<SearchbarPromo />);

    const button = screen.getByRole("button");
    const image = screen.getByAltText("promo");

    expect(button).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/promo.png");

    fireEvent.click(button);

    expect(openSpy).toHaveBeenCalledWith(
      "https://www.mercadolibre.com.ar/suscripciones/melimas#origin=banner-menu",
      "_blank"
    );

    openSpy.mockRestore();
  });
});
