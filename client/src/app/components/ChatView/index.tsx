import {FC} from "react";
import styles from './style.module.scss'
import {UserDefaultAvatar} from "../UserDefaultAvatar";

export const ChatView: FC = ({name}) => {
  return <div className={styles.main}>
    <div className={styles.leftBox}>
      <UserDefaultAvatar size={40} />
      <p>{name}</p>
    </div>
  </div>
}