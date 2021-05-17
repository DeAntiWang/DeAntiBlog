import { MouseEventHandler } from "react";

export interface IconOption {
  icon: JSX.Element,
  onClick: MouseEventHandler,
}

export default function BarElement(props: IconOption) {
  return (
    <div
      className="function-icon"
      onClick={props.onClick}
    >
      {props.icon}
    </div>
  )
}