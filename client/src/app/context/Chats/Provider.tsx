import {FC, ReactNode, useContext, useEffect, useState} from "react";
import {ChatI, MessageDataI, MessageResponseObjectI} from "./InitialData";
import {ChatsContext} from './Context';
import GreenApi from "../../../api/GreenApiHandler";
import {UserContext} from "../User/Context";

interface ChatsProviderPropsI {
  children: ReactNode
}

export const ChatsProvider: FC<ChatsProviderPropsI> = ({children}) => {
  const {chats: chatsContext} = useContext(ChatsContext)
  const [chats, setChats] = useState<ChatI[]>(chatsContext)
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
    setChats(prevState => ([{
      messages: [], chatName, chatId,
    }, ...prevState.filter(prevChat => prevChat.chatId !== chatId)]))
  }

  const addChatWithMessage = (chatName, chatId, message) => {
    const newChat = { messages: [message], chatName, chatId }
    setChats(prevState => ([newChat, ...prevState,]))
  }

  const addMessage = (chat, message) => {
    const newChat = {
      chatName: chat.chatName, chatId: chat.chatId,
      messages: [message, ...chat.messages]
    }

    const mapChats = ch => ch.chatId === chat.chatId ? newChat : ch
    setChats(prevChats => prevChats.map(mapChats))
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
    const targetChat = chats.find(chat => chat.chatId === newMessage.chatId)

    if (targetChat) {
      console.log("add message")
      addMessage(targetChat, newMessage)
    } else {
      console.log("add chat with message")
      addChatWithMessage(newMessage.chatName, newMessage.chatId, newMessage)
    }
  }

  return <ChatsContext.Provider value={{
    chats, setChats, addChat,
    addChatWithMessage, addMessage,
    handleNewMessageReceived
  }}>
    {children}
  </ChatsContext.Provider>
}

export default ChatsProvider