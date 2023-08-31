import Gallery from "../../components/Gallery/Gallery";
import HomeHero from "../../components/HomeHero/HomeHero";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <main className={styles.home}>
      <div className={styles.background}>
        <div className={styles.backgroundImg}></div>
        <div className={styles.pageBody}>
          <HomeHero />
          <Gallery />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
