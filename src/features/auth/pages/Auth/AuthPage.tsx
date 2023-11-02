import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/Logo.svg";
import { useLogout } from "../../../../lib/hooks/useLogout";
import AuthForm from "../../components/AuthForm/AuthForm";
import styles from "./AuthPage.module.scss";

const AuthPage = () => {
  const { handleLogout } = useLogout();

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <main className={styles.auth}>
      <Link to="/">
        <img src={logo} alt="Mon Vieux Grimoire" />
      </Link>
      <AuthForm />
    </main>
  );
};

export default AuthPage;
