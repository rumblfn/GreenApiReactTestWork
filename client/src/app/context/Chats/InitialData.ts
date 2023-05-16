export interface MessageObjectI {
  idMessage: string,
  timestamp: number,
  chatId: string,
  text: string | null | undefined,
  chatName: string,
  self: boolean,
}

export interface MessageDataI {
  idMessage: string,
  instanceData: {
    idInstance: number,
    typeInstance: string,
    wid: string,
  },
  messageData: {
    typeMessage: string,
    extendedTextMessageData: {
      text: string,
    },
    textMessageData: {
      textMessage: string,
    }
  },
  typeWebhook: string,
  timestamp: number,
  senderData: {
    chatId: string,
    chatName: string,
    sender: string,
    senderName: string,
  },
}

export interface MessageResponseObjectI {
  receiptId: number,
  body: MessageDataI
}

export interface ChatI {
  messages: MessageObjectI[],
  chatName: string,
  chatId: string,
}

export interface ChatsI {
  [chatId: string]: ChatI
}

export const InitialChats: ChatsI = {};