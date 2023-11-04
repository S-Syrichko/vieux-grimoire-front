import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import styles from "./HomeHero.module.scss";

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.hero}>
      <div className={styles.svgContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="961"
          height="179"
          viewBox="0 0 961 179"
          fill="none"
          preserveAspectRatio="xMinYMin meet"
          className="svg-content"
        >
          <path
            d="M1 1C59.5 59.3333 181.2 157.2 200 82C223.5 -12 -27 65 127 150.5C250.2 218.9 416.333 144.667 484 99C572.333 52.1667 791.3 -22.3 960.5 54.5"
            stroke="#F2E3CE"
            strokeDasharray="9 9"
          />
        </svg>
      </div>
      <h1>Nos livres</h1>
      <p>à lire et à relire</p>
      <div className={styles.heroCTA}>
        <Button primary onClick={() => navigate("/books/add")}>
          + Ajouter un livre
        </Button>
      </div>
    </div>
  );
};

export default HomeHero;
