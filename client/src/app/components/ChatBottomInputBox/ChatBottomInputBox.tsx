import {FC, MutableRefObject, useRef, useState} from "react";
import styles from "./style.module.scss"
import {FormField} from "../FormField";
import {Button} from "../Button";
import {SendIcon} from "../SendIcon";

export const ChatBottomInputBox: FC = (
  {sendMessage}: {sendMessage: (value: string) => void }
) => {
  const [message, setMessage] = useState("")
  const ref = useRef(null) as MutableRefObject<HTMLDivElement>

  const handleSubmit = e => {
    e.preventDefault()
    if (ref.current) {
      ref.current.textContent = ''
    }

    const messageToSend = message.trim()
    if (messageToSend.length > 0) {
      sendMessage(messageToSend)
    }
  }

  return <form className={styles.main} onSubmit={handleSubmit}>
    <FormField
      ref={ref}
      placeholder={"Введите сообщение"}
      setValue={setMessage}
      disabled={false}
    />
    <Button type={"submit"} disabled={false}>
      <SendIcon size={24} />
    </Button>
  </form>
}