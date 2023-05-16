import {MessageDataI} from "../context/Chats";

export const parseMessageData = (data: MessageDataI) => ({
  idMessage: data.idMessage,
  timestamp: data.timestamp,
  chatId: data.senderData.chatId,
  chatName: data.senderData.chatName,
  text: data.messageData?.textMessageData?.textMessage || data.messageData?.extendedTextMessageData?.text,
  self: false,
})

export const filterMessages = (messages, msgId) => {
  if (!messages) return []
  return messages.filter(msg => msg.idMessage !== msgId)
}