import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  ZEITUIProvider,
  CSSBaseline,
  Avatar
} from '@zeit-ui/react'
import './MenuBar.scss';

interface State {
  title: String,
  desc: String
}

export default class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: "DeAnti",
      desc: "Same on the other side"
    }
  }

  public render() {
    return (
      <ZEITUIProvider>
        <CSSBaseline />
        <div className={this.props.location.pathname==='/'?'whole-screen':'left-side'} id={"menu-bar"}>
          <div className={"content"}>
            <Avatar src={'https://zeit.co/api/www/avatar/?u=evilrabbit&s=160'} size={120} />
            <div id={"title"} >{this.state.title}</div>
            <div id={"desc"} >{this.state.desc}</div>
            <div className={"nav-bar"}>
              <Link to="/">Home</Link>
              <Link to="/article">Article</Link>
              <a href="#admin">Admin</a>
              <Link to="/about">About</Link>
            </div>
          </div>
        </div>
      </ZEITUIProvider>
    );
  }
}