import {FC} from "react";
import styles from './style.module.scss';
import {UserDefaultAvatar} from "../UserDefaultAvatar";

export const ProfileTopBar: FC = () => {
  return <div className={styles.main}>
    <UserDefaultAvatar size={40}/>
  </div>
}