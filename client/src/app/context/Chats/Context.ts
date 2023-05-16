import {createContext, Dispatch, SetStateAction} from "react";
import {ChatI, InitialChats, MessageDataI, MessageObjectI} from "./InitialData";

interface ChatsContextI {
  chats: ChatI[],
  setChats?: Dispatch<SetStateAction<ChatI[]>>,
  addChat?: (chatName: string, chatId: string) => void,
  addMessage?: (chat: ChatI, message: MessageObjectI) => void,
  addChatWithMessage?: (chatName: string, chatId: string, message: MessageObjectI) => void,
  handleNewMessageReceived?: (msgData: MessageDataI) => void,
}

export const ChatsContext = createContext<ChatsContextI>({
  chats: InitialChats
})