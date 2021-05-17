import * as React from 'react';
import { BlogConfig } from '../config/options';
import '../static/styles/Footer.scss';

interface Prop {
  type: "whole-screen" | "left-side"
}

export default class Footer extends React.Component<Prop> {
  constructor(props: any) {
    super(props);
  }

  componentDidUpdate() {
    document.getElementById("footer").className=this.props.type+"-footer";
  }

  public render() {
    const nowYear = new Date().getFullYear();

    return (
        <div id={"footer"} className={this.props.type + "-footer"}>
          <span className={"footer-row"}>
            Copyright&nbsp;{nowYear}&nbsp;<span dangerouslySetInnerHTML={{__html: "&#169"}}/>&nbsp;Developed by DeAnti-
          </span>
          {
            BlogConfig.recordNumber!==null?
              (<span className={"footer-row record-number"}>{BlogConfig.recordNumber}</span>)
              :(<></>)
          }
        </div>
    )
  }
}