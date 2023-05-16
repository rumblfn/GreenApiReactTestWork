import {forwardRef, MutableRefObject} from "react";
import styles from "./style.module.scss";

interface FormFieldPropsI {
  placeholder: string,
  setValue: (value: string | null) => void,
  disabled: boolean,
  ref: MutableRefObject<HTMLDivElement>
}

export const FormField = forwardRef(({placeholder, disabled, setValue}: FormFieldPropsI, ref) => {
  return <div className={styles["input-container"]}>
    <div className={styles["input-text-group"]}>
      <div
        ref={ref}
        onInput={e => setValue(e.currentTarget.textContent)}
        className={styles["input-text"]}
        contentEditable={!disabled}
      >
      </div>
      <div className={styles["placeholder"]}>
        {placeholder}
      </div>
    </div>
  </div>
})