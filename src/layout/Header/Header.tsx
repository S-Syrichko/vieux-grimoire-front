import logo from '../../assets/Logo.svg';
import AppNavigation from '../AppNavigation/AppNavigation';
import styles from './Header.module.scss';
const Header = () => {
    return (
        <header className={styles.header}>
            <img className="logo" src={logo} alt="logo"></img>
            <AppNavigation />
        </header>
    );
};

export default Header;