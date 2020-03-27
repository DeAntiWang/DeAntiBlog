import * as React from 'react';
// next.js
import Link from 'next/link';
// zeit-ui
import {
  ZEITUIProvider,
  CSSBaseline,
  Avatar
} from '@zeit-ui/react'
// css
import '../styles/MenuBar.scss';


interface State {
  title: String,
  desc: String
}

interface Prop {
  type: "whole-screen" | "left-side",
  [propName: string]: any
}

export default class App extends React.Component<Prop, State> {
  constructor(props: Prop) {
    super(props);
    this.state = {
      title: "DeAnti",
      desc: "Same on the other side"
    }
  }

  public render() {
    return (
        <div className={this.props.type} id={"menu-bar"}>
          <div className={"content"}>
            <Avatar src={'https://zeit.co/api/www/avatar/?u=evilrabbit&s=160'} size={"large"} />
            <div id={"title"} >{this.state.title}</div>
            <div id={"desc"} >{this.state.desc}</div>
            <div className={"nav-bar"}>
              <Link href="/Index"><a>Home</a></Link>
              <Link href="/ArticleList"><a>Article</a></Link>
              <a href="/Admin">Admin</a>
              <Link href="/Article"><a>About</a></Link>
            </div>
          </div>
        </div>
    );
  }
}