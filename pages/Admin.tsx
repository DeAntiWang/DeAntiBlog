import * as React from 'react';
import { Input, Button, Textarea, useToasts } from '@zeit-ui/react';
import fetch from '../common/fetch';
import "../static/styles/Admin.scss";

interface Prop {
  isLogin: boolean
}

interface State {
  isLogin: boolean,
  mode: 'list' | 'new' | 'edit'
}

export default class Admin extends React.Component<Prop, State> {
  public constructor(props: Prop) {
    super(props);
    this.state = {
      isLogin: false,
      mode: 'list'
    };
  }

  // life circle

  public static async getInitialProps() {
    const result = await fetch('/User/check');
    return { isLogin: result.isLogin }
  }

  componentDidMount() {
    this.setState({
      isLogin: this.props.isLogin
    })
  }

  public render() {
    const [toasts, setToast] = useToasts();

    const loginPage = () => {
      const [username, setUsername] = React.useState(),
            [password, setPassword] = React.useState();

      async function onLogin() {
        let result = await fetch('/User/login', 'POST', {
          nick: username,
          password: password
        });

        if(result.statusCode === 200) {
          if(result.data.isLogin) {
            setToast({ text: '登录成功'});
            this.setState({
              isLogin: true
            })
          }else{
            setToast({ text: '登录失败'})
          }
        }else{
          setToast({ text: '系统错误'})
        }
      }

      return (
        <div id={"login-page"}>
          <Input placeholder={"username"} value={username} onChange={setUsername.bind(this)} />
          <Input placeholder={"password"} value={password} onChange={setPassword.bind(this)} />
          <Button onClick={onLogin.bind(this)}>Login</Button>
        </div>
      );
    };

    const list = () => {
      return (
        <div className="admin-container">
          {

          }
        </div>
      )
    };

    const editor = (mode: string) => {
      const [title, setTitle] = React.useState(),
            [tag, setTag] = React.useState(),
            [content, setContent] = React.useState();

      async function onPost(mode: string, title: string, tag: string, content: string) {
        const url = '/Article/'+(mode==='new'?"upload":"edit");
        let result = await fetch(url, 'POST', {
          title,
          tag,
          content,
          time: Date.now()
        });

        if(result.statusCode===200) {
          setToast({text: mode==='new'?'发表成功':'编辑成功'});
          this.setState({
            mode: 'list'
          });
        }else{
          setToast({text: result.error || result.message});
        }
      }

      return (
        <div className="admin-container">
          <Input placeholder={"title"} value={title} onChange={setTitle.bind(this)}/>
          <Input placeholder={"tag"} value={tag} onChange={setTag.bind(this)} />
          <Textarea placeholder={"content"} value={content} onChange={setContent.bind(this)}/>
          <Button onClick={() => {onPost(mode,title,tag,content)}}>{mode==='new'?'Upload':'Edit'}</Button>
        </div>
      )
    };

    const adminPage = () => {
      return (
        <div id={"admin-page"}>
          {this.state.mode==='list'?list():editor(this.state.mode)}
        </div>
      );
    };

    return (
      <div>
        {this.state.isLogin?loginPage():adminPage()}
        {toasts}
      </div>
    );
  }
}