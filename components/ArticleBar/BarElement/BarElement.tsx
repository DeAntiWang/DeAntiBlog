import { MouseEventHandler } from "react";
import "../../../styles/ArticleBar.scss";
export interface IconOption {
  icon: JSX.Element | string,
  onClick: MouseEventHandler,
}

export default function BarElement(props: IconOption, index?: number) {
  const ICON = props.icon;

  return (
    <div
      className={"function-icon"}
      onClick={props.onClick}
      key={"icon-element-" + index}
    >
      { typeof ICON === "string" ?  <img src={ICON}/> : ICON }
    </div>
  )
}