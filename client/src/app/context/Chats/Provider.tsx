import {FC, ReactNode, useContext, useEffect, useState} from "react";
import {ChatI, ChatsI, MessageDataI, MessageResponseObjectI} from "./InitialData";
import {ChatsContext} from './Context';
import GreenApi from "../../../api/GreenApiHandler";
import {UserContext} from "../User/Context";

interface ChatsProviderPropsI {
  children: ReactNode
}

export const ChatsProvider: FC<ChatsProviderPropsI> = ({children}) => {
  const {chats: chatsContext} = useContext(ChatsContext)
  const [chats, setChats] = useState<ChatsI>(chatsContext)
  const {user} = useContext(UserContext)

  useEffect(() => {
    console.log(chats)
  }, [chats]);

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

  const addChat = (chatName, chatId) => {
    const newChats = {
      [chatId]: {
        messages: [], chatName, chatId
      }
    }
    setChats(prevChats => Object.assign(prevChats, newChats))
  }


  const addChatWithMessage = (chatName, chatId, message) => {
    const newChats = {
      [chatId]: {
        messages: [message],
        chatName, chatId
      }
    }
    setChats(prevChats => Object.assign(prevChats, newChats))
  }

  const addMessage = (chat, message) => {
    const newChats = {
      [chat.chatId]: {
        chatName: chat.chatName, chatId: chat.chatId,
        messages: [message, ...chat.messages]
      }
    }

    setChats(prevChats => Object.assign(prevChats, newChats))
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

    console.log(chats)
    const targetChat = chats[newMessage.chatId]

    if (targetChat) {
      console.log("add message")
      addMessage(targetChat, newMessage)
    } else {
      console.log("add chat with message")
      addChatWithMessage(newMessage.chatName, newMessage.chatId, newMessage)
    }
  }

  return <ChatsContext.Provider value={{
    chats, addChat,
    addChatWithMessage, addMessage,
    handleNewMessageReceived
  }}>
    {children}
  </ChatsContext.Provider>
}

export default ChatsProvider