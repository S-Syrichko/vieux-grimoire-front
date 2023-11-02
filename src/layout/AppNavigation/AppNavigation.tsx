import { NavLink } from "react-router-dom";
import useGlobalStore from "../../lib/hooks/useGlobalStore";
import styles from "./AppNavigation.module.scss";

const AppNavigation = () => {
  const { userId } = useGlobalStore();
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={(navData) => (navData.isActive ? styles.active : "")}
      >
        Accueil
      </NavLink>
      <NavLink
        to="/books/add"
        className={(navData) => (navData.isActive ? styles.active : "")}
      >
        Ajouter un livre
      </NavLink>
      <NavLink
        to="/auth"
        className={(navData) => (navData.isActive ? styles.active : "")}
      >
        {userId ? "Se déconnecter" : "Se connecter"}
      </NavLink>
    </nav>
  );
};

export default AppNavigation;
