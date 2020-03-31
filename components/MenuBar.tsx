import * as React from 'react';
import { BlogConfig } from '../config/options';
// next.js
import Link from 'next/link';
// zeit-ui
import { Avatar } from '@zeit-ui/react'
// css
import '../static/styles/MenuBar.scss';

interface Prop {
  type: "whole-screen" | "left-side",
  [propName: string]: any
}

export default class App extends React.Component<Prop, any> {
  constructor(props: Prop) {
    super(props);
    this.state = {
      type: this.props.type
    }
  }

  componentDidUpdate() {
    document.getElementById("menu-bar").className=this.props.type;
  }

  public render() {
    return (
      <div className={this.props.type} id={"menu-bar"}>
        <div className={"content"}>
          <Avatar src={BlogConfig.avatar} size={"large"} />
          <div id={"title"} >{BlogConfig.title}</div>
          <div id={"desc"} >{BlogConfig.desc}</div>
          <div className={"nav-bar"}>
            {
              BlogConfig.menu.map((val: any, index: number) => {
                let outside = false || val.outside;
                if(!outside) {
                  return (
                    <Link href={val.router} key={val.title + index}>
                      <a>{val.title}</a>
                    </Link>
                  )
                }else{
                  return (
                    <a href={val.router.pathname} key={val.title + index}>{val.title}</a>
                  )
                }
              })
            }
          </div>
        </div>
      </div>
    );
  }
}