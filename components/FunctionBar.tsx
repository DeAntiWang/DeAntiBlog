import * as React from 'react';
import '../static/styles/FunctionBar.scss';


interface Prop {
  list: {
    normal?: Array<any>,
    share?: Array<any>
  },
  className?: string,
  style?: React.CSSProperties
}

interface State {
  list: {
    normal?: Array<any>,
    share?: Array<any>
  }
}

export default class FunctionBar extends React.Component<Prop, State> {
  public constructor(props: Prop) {
    super(props);
    this.state = {
      list: {}
    };
  }

  componentWillMount() {
    this.setState({
      list: this.props.list
    })
  }

  public render() {
    let cnt = 0;

    const element = (val: any) => {
      cnt++;
      return (
        <div
          className="function-icon"
          onClick={val.onClick}
          key={"element-"+cnt}
        >
          {val.icon}
        </div>
      )
    };

    return (
      <div id={"function-bar-container"} className={this.props.className} style={this.props.style}>
        {
          this.state.list.normal === undefined?
            <></>:
            <div id={"normal-function-list"}>
              {
                this.state.list.normal.map(element)
              }
            </div>
        }
        {
          this.state.list.share === undefined ?
            <></> :
            <div id={"share-function-list"}>
              <span>分享</span>
              {
                this.state.list.share.map(element)
              }
            </div>
        }
      </div>
    )
  }
}
