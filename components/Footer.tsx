import * as React from 'react';
import { Container } from "@zeit-ui/react";
import { BlogConfig } from '../config/options';
import '../styles/Footer.scss';

interface Prop {
  type: "whole-screen" | "left-side"
}

export default class Footer extends React.Component<Prop> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const nowYear = new Date().getFullYear();

    return (
      <Container id={"footer-container"} className={this.props.type}>
        <div id={"footer"}>
          <span className={"footer-row"}>
            Copyright&nbsp;{nowYear}&nbsp;<span dangerouslySetInnerHTML={{__html: "&#169"}}/>&nbsp;Developed by DeAnti-
          </span>
          {
            BlogConfig.recordNumber!==null?
              (<span className={"footer-row record-number"}>{BlogConfig.recordNumber}</span>)
              :(<></>)
          }
        </div>
      </Container>
    )
  }
}