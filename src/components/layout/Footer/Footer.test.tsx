import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("should render successfully", () => {
    const { baseElement } = renderFooter();
    expect(baseElement).toBeTruthy();
  });

  it("should have a link to google maps ", () => {
    renderFooter();
    const mapLink = screen.getByText("voir sur la carte");
    expect(mapLink).toHaveAttribute("target", "_blank");
    expect(mapLink.getAttribute("href")).toMatch(
      /^https:\/\/goo\.gl\/maps\/.+/
    );
  });

  it("should have a map image", () => {
    renderFooter();
    const mapImage = screen.getByAltText("Map location");
    expect(mapImage).toHaveAttribute(
      "src",
      expect.stringContaining("location.png")
    );
  });
});

const renderFooter = () => {
  return render(<Footer />);
}

