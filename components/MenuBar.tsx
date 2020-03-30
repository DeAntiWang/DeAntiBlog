import * as React from 'react';
import { BlogConfig } from '../config/options';
// next.js
import Link from 'next/link';
// zeit-ui
import { Avatar } from '@zeit-ui/react'
// css
import '../styles/MenuBar.scss';

interface Prop {
  type: "whole-screen" | "left-side",
  [propName: string]: any
}

export default class App extends React.Component<Prop> {
  constructor(props: Prop) {
    super(props);
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
                BlogConfig.menu.map((val: any) => {
                  return (
                    <Link href={val.router}>
                      <a>{val.title}</a>
                    </Link>
                  )
                })
              }
            </div>
          </div>
        </div>
    );
  }
}