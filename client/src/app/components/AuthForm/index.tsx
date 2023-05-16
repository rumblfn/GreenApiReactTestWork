import styles from './style.module.scss';
import {FC, useContext, useState} from "react";
import {FormField} from "../FormField";
import {Button} from "../Button";
import {UserContext} from "../../context/User/Context";
import {ErrorMsg} from "../ErrorMsg";
import GreenApi from "../../../api/GreenApiHandler";

interface resStateObjectI {
  stateInstance: string
}

export const AuthForm: FC = () => {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const [idInstance, setIdInstance] = useState("")
  const [token, setToken] = useState("")

  const {setUser} = useContext(UserContext);

  const handleRes = ({stateInstance}: resStateObjectI) => {
    switch(stateInstance) {
      case "notAuthorized":
        alert("Необходима авторизация")
        break
      case "authorized":
        if (setUser) {
          setUser({
            loggedIn: true,
            idInstance, apiTokenInstance: token,
          })
        }
        break
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    setSubmitting(true)
    setError(false)

    GreenApi.get<resStateObjectI>(`/waInstance${idInstance}/getStateInstance/${token}`)
      .then(handleRes)
      .catch(e => {
        console.error(e)
        setError(true)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return <div>
    <form onSubmit={handleSubmit} className={styles.form}>
      <p>Введите свои учетные данные из системы GREEN-API</p>
      <FormField disabled={submitting} placeholder={"idInstance"} setValue={setIdInstance} />
      <FormField disabled={submitting} placeholder={"apiTokenInstance"} setValue={setToken}/>
      {error ? <ErrorMsg msg={"Что-то пошло.. Попробуйте еще раз"}/> : null}
      <Button disabled={submitting} type={"submit"}>
        {submitting ? "Загрузка.." : "Подтвердить"}
      </Button>
    </form>
  </div>
}