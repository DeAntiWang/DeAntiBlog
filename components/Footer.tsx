import * as React from 'react';
import { BlogConfig } from '../config/options';
import style from 'styles/Footer.module.scss';

interface Prop {
  type: "whole-screen" | "left-side"
}

export default class Footer extends React.Component<Prop> {
  constructor(props: any) {
    super(props);
  }

  componentDidUpdate() {
    document.getElementById(style.footer).className=style[this.props.type+"-footer"];
  }

  public render() {
    const nowYear = new Date().getFullYear();

    return (
        <div id={style.footer} className={style[this.props.type + "-footer"]}>
          <span className={style["footer-row"]}>
            Copyright&nbsp;{nowYear}&nbsp;<span dangerouslySetInnerHTML={{__html: "&#169"}}/>&nbsp;Developed by DeAnti-
          </span>
          {
            BlogConfig.recordNumber!==null?
              (<span className={`${style["footer-row"]} ${style["record-number"]}`}>{BlogConfig.recordNumber}</span>)
              :(<></>)
          }
        </div>
    )
  }
}