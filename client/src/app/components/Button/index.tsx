import {FC} from "react";
import styles from './style.module.scss';

interface ButtonPropsI {
  type: "submit" | "reset" | "button" | undefined,
  disabled: boolean,
}

export const Button: FC<ButtonPropsI> = ({type, disabled, children}) => {
  return <button  disabled={disabled} className={styles.button} type={type}>
    {children}
  </button>
}