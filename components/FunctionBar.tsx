import * as React from 'react';
import '../static/styles/FunctionBar.scss';

interface Element {
  icon: SVGElement,
  onClick: (event: any) => void
}

interface Prop {
  list: {
    normal?: Array<Element>,
    share?: Array<Element>
  },
  className?: string,
  style?: React.CSSProperties
}

interface State {
  list: {
    normal?: Array<Element>,
    share?: Array<Element>
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
    const element = (val: Element) => {
      return (
        <div className="function-icon" onClick={val.onClick} >
          {val.icon}
        </div>
      )
    };

    return (
      <div id={"function-bar-container"} className={this.props.className} style={this.props.style}>
        <div id={"normal-function-list"}>
          {
            this.state.list.normal.map(element)
          }
        </div>
        <div id={"share-function-list"}>
          <span>Share</span>
          {
            this.state.list.share.map(element)
          }
        </div>
      </div>
    )
  }
}
