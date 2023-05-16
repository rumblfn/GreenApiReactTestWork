import styles from './style.module.scss'
import {FC} from "react";
import {ProfileTopBar} from "../ProfileTopBar";
import {SearchNewChat} from "../SearchNewChat";
import {ChatsList} from "../ChatsList";

export const SideBox: FC = () => {
  return <div className={styles.side}>
    <ProfileTopBar/>
    <SearchNewChat />
    <ChatsList/>
  </div>
}