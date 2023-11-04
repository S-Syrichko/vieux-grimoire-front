import AppNavigation from '../AppNavigation/AppNavigation';
import styles from './Header.module.scss';
const Header = () => {
    return (
        <header className={styles.header}>
            <AppNavigation />
        </header>
    );
};

export default Header;