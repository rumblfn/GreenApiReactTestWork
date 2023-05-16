import {FC, useContext, useEffect, useState} from "react";
import styles from './style.module.scss';
import {InputField} from "../InputField";
import useDebounce from "../../hooks/use-debounce";
import GreenApi from "../../../api/GreenApiHandler";
import {UserContext} from "../../context/User";
import {ChatsContext} from "../../context/Chats";

interface resCheckWhatsapp {
  existsWhatsapp: boolean,
}

export const SearchNewChat: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const debouncedSearchValue = useDebounce(searchValue, 300)

  const {user} = useContext(UserContext)
  const {addChat} = useContext(ChatsContext)

  const handleRes = ({existsWhatsapp}: resCheckWhatsapp, phoneNumber) => {
    if (existsWhatsapp) {
      setSearchValue("")

      if (addChat) {
        const chatName = phoneNumber.toString()
        addChat(chatName)
      }
    }
  }

  const checkPhoneNumber = (phoneNumber) => {
    GreenApi.post<resCheckWhatsapp>(
      `/waInstance${user.idInstance}/CheckWhatsapp/${user.apiTokenInstance}`,
      {
        phoneNumber: phoneNumber
      }
    )
      .then(res => handleRes(res, phoneNumber))
      .catch(console.error)
  }

  useEffect(() => {
    const searchStringOnlyDigits = debouncedSearchValue.replace(/\D/g, '')

    if (11 <= searchStringOnlyDigits.length && searchStringOnlyDigits.length <= 12) {
      checkPhoneNumber(+searchStringOnlyDigits)
    }
  }, [debouncedSearchValue])

  return <div className={styles.main}>
    <InputField value={searchValue} placeholder={"Поиск или новый чат"} setValue={setSearchValue} />
  </div>
}