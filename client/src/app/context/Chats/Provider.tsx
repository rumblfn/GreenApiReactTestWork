import {FC, ReactNode, useContext, useEffect, useState} from "react";
import {ChatI, ChatsI, MessageDataI, MessageResponseObjectI} from "./InitialData";
import {ChatsContext} from './Context';
import GreenApi from "../../../api/GreenApiHandler";
import {UserContext} from "../User/Context";
import {messages} from "nx/src/utils/ab-testing";

interface ChatsProviderPropsI {
  children: ReactNode
}

export const ChatsProvider: FC<ChatsProviderPropsI> = ({children}) => {
  const {chats: chatsContext} = useContext(ChatsContext)
  const [chats, setChats] = useState<ChatsI>(chatsContext)
  const {user} = useContext(UserContext)

  useEffect(() => {
    gettingMessages().catch(console.error)
  }, []);

  const gettingMessages = async () => {
    const response = await GreenApi.get<MessageResponseObjectI>(
      `/waInstance${user.idInstance}/ReceiveNotification/${user.apiTokenInstance}`
    )

    if (response && handleNewMessageReceived) {

      await GreenApi.delete(
        `/waInstance${user.idInstance}/DeleteNotification/${user.apiTokenInstance}/${response.receiptId}`
      )
      const msgData = response.body

      if (msgData?.typeWebhook === "incomingMessageReceived") {
        handleNewMessageReceived(msgData)
      }
    }

    setTimeout(() => {
      gettingMessages()
    }, 5 * 1000)
  }

  const filterMessages = (messages, msgId) => {
    if (!messages) return []
    return messages.filter(msg => msg.idMessage !== msgId)
  }

  const addMessage = (message) => {
    const chatId = message.chatId

    setChats(prevChats => Object.assign({}, prevChats, {
      [chatId]: {
        messages: [
          message,
          ...filterMessages(prevChats[chatId]?.messages, message.idMessage),
        ],
        chatName: message.chatName, chatId
      }
    }))
  }

  const handleNewMessageReceived = (msgData: MessageDataI) => {
    const newMessage = {
      idMessage: msgData.idMessage,
      timestamp: msgData.timestamp,
      chatId: msgData.senderData.chatId,
      chatName: msgData.senderData.chatName,
      text: msgData.messageData?.textMessageData?.textMessage
        || msgData.messageData?.extendedTextMessageData?.text,
      self: false,
    }

    addMessage(newMessage)
  }

  return <ChatsContext.Provider value={{
    chats, addMessage,
    handleNewMessageReceived
  }}>
    {children}
  </ChatsContext.Provider>
}

export default ChatsProvider