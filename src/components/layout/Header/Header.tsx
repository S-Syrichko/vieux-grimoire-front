import logo from '../../../assets/logo.svg';
import AppNavigation from '../AppNavigation/AppNavigation';
import styles from './Header.module.scss';
const Header = () => {
    return (
        <header className={styles.header}>
            <img className="logo" src={logo} alt="Sportify"></img>
            <AppNavigation />
        </header>
    );
};

export default Header;