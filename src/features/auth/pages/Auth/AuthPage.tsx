import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo.svg';
import styles from './AuthPage.module.scss';
import AuthForm from '../../components/AuthForm/AuthForm';
const AuthPage = () => {
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