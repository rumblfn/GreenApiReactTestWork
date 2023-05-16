import {Route, Routes} from "react-router-dom";
import AuthPage from "./Auth";
import HomePage from "./Home";
import ChatsProvider from "../context/Chats/Provider";

const Router = () => {
  return <Routes>
    <Route path="/auth" element={ <AuthPage /> } />
    <Route path="/chats/*" element={
      <ChatsProvider>
        <HomePage />
      </ChatsProvider>
    } />
  </Routes>
}

export default Router