import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";
import logo from "../../../../assets/logo.svg";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.notFound}>
      <Link to="/">
        <img src={logo} alt="Mon Vieux Grimoire" />
      </Link>
      <h1>4😕4</h1>
      <p>La page que vous demandez n'existe pas</p>
      <button onClick={() => navigate("/")}>Retour à l'accueil</button>
    </div>
  );
};

export default NotFoundPage;
