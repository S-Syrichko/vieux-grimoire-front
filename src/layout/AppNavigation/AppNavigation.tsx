import { NavLink } from "react-router-dom";
import useGlobalStore from "../../lib/hooks/useGlobalStore";
import styles from "./AppNavigation.module.scss";
import { useState } from "react";
import logo from "../../assets/Logo.svg";

const AppNavigation = () => {
  const { userId } = useGlobalStore();
  const [showLinks, setShowLinks] = useState(false);

  const toggleMobileMenu = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav className={`${styles.navbar} ${showLinks ? styles.showLinks : ""}`}>
      <img className="logo" src={logo} alt="logo"></img>
      <ul className={styles.navbarLinks}>
        <li className={`${styles.navbarItem} ${styles.slideIn_1}`}>
          <NavLink
            to="/"
            className={(navData) => (navData.isActive ? styles.active : "")}
            onClick={showLinks ? toggleMobileMenu :  undefined}
          >
            Accueil
          </NavLink>
        </li>
        <li className={`${styles.navbarItem} ${styles.slideIn_2}`}>
          <NavLink
            to="/books/add"
            className={(navData) => (navData.isActive ? styles.active : "")}
            onClick={showLinks ? toggleMobileMenu :  undefined}
          >
            Ajouter un livre
          </NavLink>
        </li>
        <li className={`${styles.navbarItem} ${styles.slideIn_3}`}>
          <NavLink
            to="/auth"
            className={(navData) => (navData.isActive ? styles.active : "")}
            onClick={showLinks ? toggleMobileMenu :  undefined}
          >
            Se {userId ? "déconnecter" : "connecter"}
          </NavLink>
        </li>
      </ul>
      <button className={styles.burgerButton} onClick={toggleMobileMenu}>
        <span className={styles.burgerButtonBar}></span>
      </button>
    </nav>
  );
};

export default AppNavigation;
