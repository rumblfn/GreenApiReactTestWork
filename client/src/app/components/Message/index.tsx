import {FC} from "react";
import {MessageObjectI} from "../../context/Chats/InitialData";
import styles from './style.module.scss'

export const Message: FC = ({msg}: {msg: MessageObjectI}) => {
  return <div className={styles.message} style={{
    backgroundColor: msg.self ? "var(--self-message-color)" : "var(--message-color)",
    margin: msg.self ? "0 0 0 auto" : "0 auto 0 0"
  }}>
    <p className={styles.text}>{msg.text}</p>
  </div>
}