import {FC} from "react";
import {UserDefaultAvatar} from "../UserDefaultAvatar";
import styles from './style.module.scss';
import {useNavigate} from "react-router-dom";

export const ChatItem: FC = ({name, id}) => {
  const navigate = useNavigate()

  const handleOpenChat = () => {
    navigate('/chats/' + id)
  }

  return <div
    className={styles.listItem}
    onClick={handleOpenChat}
  >
    <UserDefaultAvatar size={49}/>
    <div className={styles.body}>
      <p className={styles.name}>{name}</p>
    </div>
  </div>
}