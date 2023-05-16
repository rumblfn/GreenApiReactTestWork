import {FC, ReactNode, useContext, useEffect, useState} from "react";
import {ChatsI, MessageDataI} from "./InitialData";
import {ChatsContext} from './Context';
import GreenApi from "../../../api/GreenApiHandler";
import {UserContext} from "../User";
import {filterMessages, parseMessageData} from "../../utils";
import {formatChatId} from "../../utils"

const delayInMsForRequestNewMessage = 500

interface ChatsProviderPropsI {
  children: ReactNode
}

export const ChatsProvider: FC<ChatsProviderPropsI> = ({children}) => {
  const {chats: chatsContext} = useContext(ChatsContext)
  const {user} = useContext(UserContext)

  const [chats, setChats] = useState<ChatsI>(chatsContext)

  useEffect(() => {
    gettingMessages().catch(console.error)
  }, []);

  const gettingMessages = async () => {
    const response = await GreenApi.getMessageInOrder(user)

    if (response) {
      await GreenApi.deleteReceivedMessage(user, response.receiptId)
      const msgData = response.body

      if (msgData?.typeWebhook === "incomingMessageReceived") {
        handleNewMessageReceived(msgData)
      }
    }

    setTimeout(() => {
      gettingMessages()
    }, delayInMsForRequestNewMessage)
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

  const addChat = (chatName: string) => {
    const chatId = formatChatId(chatName)

    setChats(prevChats => Object.assign({}, prevChats, {
      [chatId]: {
        messages: [],
        chatName, chatId
      }
    }))
  }

  const handleNewMessageReceived = (msgData: MessageDataI) => {
    const newMessage = parseMessageData(msgData)
    addMessage(newMessage)
  }

  return <ChatsContext.Provider value={{chats, addMessage, addChat}}>
    {children}
  </ChatsContext.Provider>
}

export default ChatsProvider