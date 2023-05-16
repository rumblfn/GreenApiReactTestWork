import {FC, useContext} from "react";
import styles from './style.module.scss';
import {useParams} from "react-router-dom";
import {ChatsContext} from "../../context/Chats";
import {ChatView} from "../ChatView";
import {ChatMessages} from "../Messages";
import {ChatBottomInputBox} from "../ChatBottomInputBox";
import GreenApi from "../../../api/GreenApiHandler";
import {UserContext} from "../../context/User";

export const Chat: FC = () => {
  const {id} = useParams()
  const {chats, addMessage} = useContext(ChatsContext)
  const {user} = useContext(UserContext)

  const chat = chats[id]

  if (!chat) return null

  const sendMessage = message => {
    const messageFormatted = {
      idMessage: "",
      timestamp: new Date().getTime() / 1000,
      chatId: chat.chatId,
      chatName: chat.chatName,
      text: message,
      self: true
    }

    GreenApi.sendMessage(user, messageFormatted)
      .then(res => {
        if (res.idMessage && addMessage) {
          messageFormatted.idMessage = res.idMessage
          addMessage(messageFormatted)
        }
      })
      .catch(console.error)
  }

  return <div className={styles.chat}>
    <ChatView name={chat.chatName}/>
    <ChatMessages messages={chat.messages} />
    <ChatBottomInputBox
      sendMessage={sendMessage}
    />
  </div>
}