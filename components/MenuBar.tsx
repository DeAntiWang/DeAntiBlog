import * as React from 'react';
import Footer from './Footer';
import { BlogConfig } from '../config/options';
// next.js
import Link from 'next/link';
// zeit-ui
import { Avatar, Container } from '@zeit-ui/react'
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
      <Container>
        <div className={this.props.type} id={"menu-bar"}>
          <div className={"content"}>
            <Avatar src={BlogConfig.avatar} size={"large"} />
            <div id={"title"} >{BlogConfig.title}</div>
            <div id={"desc"} >{BlogConfig.desc}</div>
            <div className={"nav-bar"}>
              {
                BlogConfig.menu.map((val: any, index: number) => {
                  return (
                    <Link href={val.router} key={val.title + index}>
                      <a>{val.title}</a>
                    </Link>
                  )
                })
              }
            </div>
          </div>
        </div>
        <Footer type={this.props.type}/>
      </Container>
    );
  }
}