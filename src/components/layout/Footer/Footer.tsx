import location from "../../../assets/images/location.png";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.adress}>
        <div className={styles.imageContainer}>
          <img src={location} alt="Map location" />
        </div>
        <div className={styles.adressContainer}>
          <p>8 place Jeanne d'Arc</p>
          <p>59000 Lille</p>
          <a href="https://goo.gl/maps/7rAtEdkLEoPFS9av6">voir sur la carte</a>
        </div>
        <p className={styles.phone}>01 12 23 34 45</p>
      </div>
      <div className={styles.copyright}>
        <p>Copyright 2022-2023</p>
      </div>
      <div className={styles.mentions}>
        <p>Mentions legales</p>
      </div>
    </footer>
  );
};

export default Footer;
