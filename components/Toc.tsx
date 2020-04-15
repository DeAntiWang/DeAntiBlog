import * as React from 'react';

interface Prop {
  withMask: boolean,
  content: string
}

export default class Toc extends React.Component<Prop, any> {
  public constructor(props: any) {
    super(props);
    this.state = {
      list: {}
    }
  }

  private getToc() {
    let strArr = this.props.content.split('\n');
    let reg = /(#+)\s(.*)/;
    for(let line in strArr) {
      let res = reg.exec(line.trim());
      
    }
  }

  public render() {
    return (
      <div>
        <div id={"toc-mask"} />
        <div id={"toc-list"}>

        </div>
      </div>
    )
  }
}