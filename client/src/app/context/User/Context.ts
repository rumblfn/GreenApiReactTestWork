import {createContext, Dispatch, SetStateAction} from "react";
import {InitialUser, UserI} from "./InitialData";

interface UserContextI {
  user: UserI,
  setUser?: Dispatch<SetStateAction<UserI>>
}

export const UserContext = createContext<UserContextI>({
  user: InitialUser
})