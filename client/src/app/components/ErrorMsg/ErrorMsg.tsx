import {FC} from "react";
import styles from './style.module.scss';

interface ErrorMsgPropsI {
  msg: string
}

export const ErrorMsg: FC<ErrorMsgPropsI> = ({msg}) => {
  return <p className={styles.error}>{msg}</p>
}