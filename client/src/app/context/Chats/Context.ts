import {createContext, Dispatch, SetStateAction} from "react";
import {ChatI, ChatsI, InitialChats, MessageDataI, MessageObjectI} from "./InitialData";

interface ChatsContextI {
  chats: ChatsI
  setChats?: Dispatch<SetStateAction<ChatI[]>>,
  addChat?: (chatName: string) => void,
  addMessage?: (MessageObjectI) => void,
  addChatWithMessage?: (chatName: string, chatId: string, message: MessageObjectI) => void,
  handleNewMessageReceived?: (msgData: MessageDataI, chats: ChatI[]) => void,
}

export const ChatsContext = createContext<ChatsContextI>({
  chats: InitialChats
})