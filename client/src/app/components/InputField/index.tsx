import {Dispatch, FC, MutableRefObject, SetStateAction, useRef} from "react";
import styles from './style.module.scss';
import {SearchIcon} from "../SearchButton";

interface InputFieldPropsI {
  placeholder: string,
  setValue: Dispatch<SetStateAction<string>>
}

export const InputField: FC<InputFieldPropsI> = ({placeholder, setValue, value}) => {
  const inputRef = useRef(null) as MutableRefObject<HTMLInputElement>

  const handleClick = () => {
    inputRef.current.focus()
  }

  return <div className={styles.main}>
    <span
      className={styles.searchButton}
      onClick={handleClick}>
      <SearchIcon size={24} />
    </span>
    <input
      type="text"
      ref={inputRef}
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  </div>
}