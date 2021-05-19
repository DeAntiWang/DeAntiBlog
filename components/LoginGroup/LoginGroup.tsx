import { useContext, useEffect, useRef, useState } from "react";
import { LoginContext } from "../../pages/Admin";
import {
  Input,
  Button,
  useToasts,
  useInput
} from "@geist-ui/react";
import fetch from "../../common/fetch";
import { passwordEncode } from "../../common/verify";
import "../../styles/LoginGroup.scss";

export default function LoginGroup() {
  const passwdRef = useRef();
  const { isLogin, dispatch } = useContext(LoginContext);
  const [toasts, setToast] = useToasts();
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const onClick = async () => {
    if (!account || !password || loading) return;
    setLoading(true);
    const resp = await fetch("/user/login", "POST", {
      nick: account,
      password: passwordEncode(password),
    });

    console.log(passwordEncode(password));

    if (resp.statusCode === 200) {
      dispatch(true);
      setToast({
        text: '登录成功',
        type: 'success',
      });
    } else {
      dispatch(false);
      setToast({
        text: '登录失败',
        type: 'error',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const passwdInputDom: any = passwdRef.current;
    const onEnter = (ev: any) => {
      if (ev.key === "Enter" || ev.code === "Enter") onClick.apply(undefined);
    };

    passwdInputDom.addEventListener("keydown", onEnter);

    return () => {
      passwdInputDom.removeEventListener("keydown", onEnter)
    }
  }, []);

  return (
    <div className="login-group">
      <Input label="Account"
        value={account}
        onChange={(ev: any) => setAccount(ev.target.value)}
      />
      <Input.Password ref={passwdRef}
        label="Password"
        hideToggle={true}
        value={password}
        onChange={(ev: any) => setPassword(ev.target.value)}
      />
      <Button onClick={onClick}>Login</Button>
    </div>
  )  
}