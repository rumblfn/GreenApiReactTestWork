import {FC, useContext} from "react";
import {ChatsContext} from "../../context/Chats/Context";
import {ChatItem} from "../ChatItem";
import styles from './style.module.scss';

export const ChatsList: FC = () => {
  const {chats} = useContext(ChatsContext)

  return <div className={styles.wrapper}>
    {Object.values(chats).map(({chatName, chatId}) =>
      <ChatItem key={chatId} id={chatId} name={chatName} />
    )}
  </div>
}