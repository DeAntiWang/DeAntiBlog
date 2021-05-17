import { MouseEventHandler } from "react";
import style from "styles/ArticleBar.module.scss";
export interface IconOption {
  icon: JSX.Element,
  onClick: MouseEventHandler,
}

export default function BarElement(props: IconOption) {
  return (
    <div
      className={style["function-icon"]}
      onClick={props.onClick}
    >
      {props.icon}
    </div>
  )
}