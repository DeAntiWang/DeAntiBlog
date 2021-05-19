import { createContext, useReducer } from "react";
import LoginGroup from "../components/LoginGroup/LoginGroup";
import UploadBox from "components/UploadBox/UploadBox";
import "../styles/Admin.scss";

interface LoginContext {
  isLogin: Boolean,
  dispatch: Function
}

const reducer = (state: any, action: Boolean) => {
  const isLogin = action || false;
  return isLogin;
}

const defaultContextValue: LoginContext = {
  isLogin: false,
  dispatch: undefined
};

export const LoginContext = createContext(defaultContextValue);

export default function Admin() {
  const [isLogin, loginDispatch] = useReducer(reducer, false);

  return (
    <LoginContext.Provider value={{ isLogin: isLogin , dispatch: loginDispatch }}>
      <div className={"admin-page"}>
        {
          !isLogin ? <LoginGroup/> : <UploadBox/>
        }
      </div>
    </LoginContext.Provider>
  )  
}