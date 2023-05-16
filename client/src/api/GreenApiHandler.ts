import {MessageObjectI, MessageResponseObjectI} from "../app/context/Chats";


class GreenApi {
  static readonly host: string = "https://api.green-api.com";

  static getMessageInOrder({idInstance, apiTokenInstance}): Promise<MessageResponseObjectI> {
    return this.get(`/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)
  }

  static deleteReceivedMessage({idInstance, apiTokenInstance}, receiptId: number) {
    return this.delete(`/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`)
  }

  static sendMessage({idInstance, apiTokenInstance}, message: MessageObjectI): Promise<{idMessage: string}> {
    return this.post<{idMessage: string}>(
      `/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
      { chatId: message.chatId, message: message.text }
    )
  }

  static get<T>(url: string): Promise<T> {
    return fetch(this.host + url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json<T>()
      })
  }

  static post<T>(url: string, body: object = {}): Promise<T> {
    return fetch(this.host + url, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json<T>()
      })
  }

  static delete<T>(url: string): Promise<T> {
    return fetch(this.host + url, {
      method: "DELETE"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json<T>()
      })
  }
}

export default GreenApi