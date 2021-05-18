import { MouseEventHandler } from "react";
import "styles/ArticleBar.scss";
export interface IconOption {
  icon: JSX.Element,
  onClick: MouseEventHandler,
}

export default function BarElement(props: IconOption, index?: number) {
  return (
    <div
      className={"function-icon"}
      onClick={props.onClick}
      key={"icon-element-" + index}
    >
      {props.icon}
    </div>
  )
}