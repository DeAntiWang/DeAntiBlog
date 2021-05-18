import { CSSProperties } from "react";
import BarElement, { IconOption } from "./BarElement/BarElement";
import 'styles/ArticleBar.scss';

interface Prop {
  normal?: Array<IconOption>,
  share?: Array<IconOption>,
  className?: string,
  style?: CSSProperties
}

export default function ArticleBar(props: Prop) {
  return (
    <div id={"function-bar-container"} className={props.className} style={props.style}>
      {
        props.normal &&
          <div id={"normal-function-list"}>
            {
              props.normal.map(BarElement)
            }
          </div>
      }
      {
        props.share &&
          <div id={"share-function-list"}>
            <span>分享</span>
            {
              props.share.map(BarElement)
            }
          </div>
      }
    </div>
  )
}