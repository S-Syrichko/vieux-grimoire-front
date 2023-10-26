import { Link } from "react-router-dom";
import arrowLeft from "../../assets/svg/arrow-left.svg";
import styles from "./ReturnArrow.module.scss";

const ReturnArrow = () => {
  return (
    <Link to="/" className={styles.return}>
      <img src={arrowLeft} alt="Fleche" />
      <p>Retour</p>
    </Link>
  );
};

export default ReturnArrow;
