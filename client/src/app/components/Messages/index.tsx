import {FC} from "react";
import styles from './style.module.scss'
import {Message} from "../Message";

export const ChatMessages: FC = ({messages}) => {

  return <div className={styles.messages}>
    <div className={styles.wrapper}>
      {messages.map(msg => <Message msg={msg} key={msg.idMessage} />)}
    </div>
  </div>
}