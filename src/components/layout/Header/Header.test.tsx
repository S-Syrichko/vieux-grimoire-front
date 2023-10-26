import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";


describe ("Header", () => {
    it("should render successfully", () => {
        const { baseElement } = renderHeader();
        expect(baseElement).toBeTruthy();
    });
    it("should have a logo", () => {
        renderHeader();
        const logo = screen.getByAltText("logo");
        expect(logo).toHaveAttribute("src", expect.stringContaining("logo.svg"));
    });
    it("should have a navigation", () => {
        renderHeader();
        const navigation = screen.getByRole("navigation");
        expect(navigation).toBeInTheDocument();
    });
});

const renderHeader = () => {
    return render(<MemoryRouter initialEntries={["/"]}>
    <Header />
  </MemoryRouter>);
}