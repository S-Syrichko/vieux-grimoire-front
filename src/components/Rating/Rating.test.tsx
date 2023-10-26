import { render, fireEvent } from "@testing-library/react";
import Rating from "./Rating";
import { vi } from "vitest";

describe("Rating component", () => {
  it("renders five stars", () => {
    const { getAllByAltText } = render(<Rating size="medium" />);
    const stars = getAllByAltText(/star/i);
    expect(stars.length).toBe(5);
  });

  it("renders selected stars", () => {
    const { getAllByAltText } = render(<Rating size="medium" rating={3} />);
    const selectedStars = getAllByAltText(/filled star/i);
    expect(selectedStars.length).toBe(3);
  });

  it("calls onSelect when a star is clicked", () => {
    const onSelect = vi.fn();
    const { getAllByAltText } = render(
      <Rating size="medium" onSelect={onSelect} />
    );
    const star = getAllByAltText(/empty star/i)[2];
    fireEvent.click(star);
    expect(onSelect).toHaveBeenCalledWith(3);
  });

  it("does not call onSelect when isReadOnly is true", () => {
    const onSelect = vi.fn();
    const { getAllByAltText } = render(
      <Rating size="medium" isReadOnly onSelect={onSelect} />
    );
    const star = getAllByAltText(/empty star/i)[2];
    fireEvent.click(star);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
