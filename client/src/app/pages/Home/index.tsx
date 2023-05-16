import {FC} from "react";
import styles from './style.module.scss';
import {SideBox} from "../../components/SideBox";
import {Chat} from "../../components/Chat";
import {Route, Routes} from "react-router-dom";

const HomePage: FC = () => {
  return <div className={styles.pageBox}>
    <SideBox/>
    <div className={styles.wrapper}>
      <Routes>
        <Route path=":id" element={<Chat/>}/>
      </Routes>
    </div>
  </div>
}

export default HomePage