import { CSSProperties } from "react";
import BarElement, { IconOption } from "./BarElement/BarElement";
import style from 'styles/ArticleBar.module.scss';

interface Prop {
  normal?: Array<IconOption>,
  share?: Array<IconOption>,
  className?: string,
  style?: CSSProperties
}

export default function ArticleBar(props: Prop) {
  return (
    <div id={style["function-bar-container"]} className={style[props.className] || props.className} style={props.style}>
      {
        props.normal &&
          <div id={style["normal-function-list"]}>
            {
              props.normal.map(BarElement)
            }
          </div>
      }
      {
        props.share &&
          <div id={style["share-function-list"]}>
            <span>分享</span>
            {
              props.share.map(BarElement)
            }
          </div>
      }
    </div>
  )
}