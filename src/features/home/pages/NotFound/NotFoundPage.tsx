import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/Logo.svg";
import Button from "../../../../components/Button/Button";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.notFound}>
      <Link to="/">
        <img src={logo} alt="Mon Vieux Grimoire" />
      </Link>
      <h1>4😕4</h1>
      <p>La page que vous demandez n'existe pas</p>
      <Button primary onClick={() => navigate("/")}>Retour à l'accueil</Button>
    </div>
  );
};

export default NotFoundPage;
