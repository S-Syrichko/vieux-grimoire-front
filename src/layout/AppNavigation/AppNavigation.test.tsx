import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppNavigation from "./AppNavigation";
import useGlobalStore from "../../../lib/hooks/useGlobalStore";

describe("AppNavigation", () => {
  it("should render the correct links", () => {
    renderAppNavigation();

    const homeLink = screen.getByText("Accueil");
    const addBookLink = screen.getByText("Ajouter un livre");
    const authLink = screen.getByText("Se connecter");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(addBookLink).toHaveAttribute("href", "/books/add");
    expect(authLink).toHaveAttribute("href", "/auth");
  });
  it("should render the login link when userId is falsy", () => {
    useGlobalStore.setState({ userId: "" });
    renderAppNavigation();
    const loginLink = screen.getByText("Se connecter");
    expect(loginLink).toBeInTheDocument();
  });

  it("should render the logout link when userId is truthy", () => {
    useGlobalStore.setState({ userId: "123" });
    renderAppNavigation();

    const logoutLink = screen.getByText("Se déconnecter");
    expect(logoutLink).toBeInTheDocument();
  });
});

const renderAppNavigation = () => {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <AppNavigation />
    </MemoryRouter>
  );
};
