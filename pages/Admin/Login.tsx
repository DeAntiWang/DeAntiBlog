import * as React from 'react';
import { Input, Button } from '@zeit-ui/react';
import Router from 'next/router';
import fetch from '../../common/fetch';
import notice from '../../common/clientMsg';
import "../../static/styles/Admin.scss";

export default class AdminLogin extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);
    this.state={
      username: '',
      password: ''
    };
  }

  private async onLogin() {
    const username = this.state.username,
          password = this.state.password;
    const result = await fetch('/User/login', 'POST', {
      nick: username,
      password: password
    });

    if(result.statusCode===200) {
      if(result) {
        // 登录成功
        notice('登录成功');
        Router.push('/Admin/List')
      }else{
        // 登录失败
        notice('登录失败');
      }
    }else{
      // 系统错误
      notice('系统错误');
    }
  }

  public render() {
    return (
      <div id={"admin-login"}>
        <div>
          <h2>Login</h2>
          <Input
            placeholder={"Username"}
            value={this.state.username}
            onChange={(ev: any) => this.setState({username: ev.target.value})}
            width="100%"
            clearable
          />
          <Input
            placeholder={"Password"}
            value={this.state.password}
            onChange={(ev: any) => this.setState({password: ev.target.value})}
            width="100%"
            type={"password"}
            clearable
          />
          <Button onClick={this.onLogin.bind(this)}>Login</Button>
        </div>
      </div>
    )
  }
}

export async function getStaticProps() {
  const res = await fetch('/User/check');

  if(res.statusCode===200 && res.data.isLogin) {
    Router.push('/Admin/');
  }

  return {
    props: {
      isLogin: res.data.isLogin
    }
  }
}