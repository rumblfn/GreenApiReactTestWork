import styles from './style.module.scss';
import {AuthForm} from "../../components/AuthForm";
import {FC} from "react";

const AuthPage: FC = () => {
  return <div className={styles.page}>
    <h2>Авторизация</h2>
    <AuthForm />
  </div>
}

export default AuthPage