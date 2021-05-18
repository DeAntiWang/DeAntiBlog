import { useEffect } from 'react'
import { BlogConfig } from '../configs/options';
// next.js
import Link from 'next/link';
import { Avatar } from '@geist-ui/react'
// css
import '../styles/MenuBar.scss';

interface Prop {
  type: "whole-screen" | "left-side",
  [propName: string]: any
}

export default function MenuBar(props: Prop) {
  useEffect(() => {
    document.getElementById("menu-bar").className = props.type;
  }, [])

  return (
    <div className={props.type} id={"menu-bar"}>
      <div className={"content"}>
        <Avatar src={BlogConfig.avatar} size={"large"} className={"avatar"}/>
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