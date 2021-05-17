import * as React from 'react';
import { BlogConfig } from '../config/options';
// next.js
import Link from 'next/link';
import { Avatar } from '@geist-ui/react'
// css
import style from 'styles/MenuBar.module.scss';

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
    document.getElementById(style["menu-bar"]).className=style[this.props.type];
  }

  public render() {
    return (
      <div className={style[this.props.type]} id={style["menu-bar"]}>
        <div className={style.content}>
          <Avatar src={BlogConfig.avatar} size={"large"} />
          <div id={style.title} >{BlogConfig.title}</div>
          <div id={style.desc} >{BlogConfig.desc}</div>
          <div className={style["nav-bar"]}>
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