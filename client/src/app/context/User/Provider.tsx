import {FC, ReactNode, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {InitialUser, UserI} from "./InitialData";
import {UserContext} from './Context';

interface UserProviderPropsI {
  children: ReactNode
}

export const UserProvider: FC<UserProviderPropsI> = ({children}) => {
  const [user, setUser] = useState<UserI>(InitialUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.loggedIn) {
      navigate("/auth")
    } else {
      navigate("/chats")
    }

  }, [user]);

  useEffect(() => {

    // TODO: make request
  }, [])

  return <UserContext.Provider value={{user, setUser}}>
    {children}
  </UserContext.Provider>
}

export default UserProvider