import * as React from 'react';
import { backTopOption } from 'config/options';
import 'styles/BackTop.scss';

interface Prop {
  listen: string
}

export default class BackTop extends React.Component<Prop, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      display: false
    }
  }


  // attribute

  private progressPath: SVGPathElement= null;

  private pathLength: number = 0;

  private _window: any = null;

  private listen: HTMLElement = null;

  // Function

  private getContentHeight(dom: Element): number {
    let height = 0.0,
        len = dom.children.length;
    for(let i=0;i<len;i++) {
      height += parseFloat(this._window.getComputedStyle(dom.children[i]).getPropertyValue('height').replace("px", ""));
    }
    return height;
  }

  // Event Handler

  private backTop() {
    this.listen.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  private scrollHandler() {
    const dom = this.listen,
          scrollTop = dom.scrollTop;
    let height = this.getContentHeight(dom) - dom.offsetHeight;

    if(document.body.offsetWidth<=900) {
      height += 40;
    }

    if(scrollTop > backTopOption.offset) {
      this.setState({display: true});
    }else{
      this.setState({display: false});
    }

    // update progress
    const percent = scrollTop / height;
    this.progressPath.style.strokeDashoffset = `${~~((1-percent)*this.pathLength)}`;
  }

  // Life circle Hocks

  componentDidMount() {
    // init
    this.listen = document.getElementById(this.props.listen);
    this._window = window;
    this.progressPath = document.querySelector(`.progress-wrap path`);
    this.pathLength = this.progressPath.getTotalLength();
    // progressPath
    this.progressPath.style.transition = this.progressPath.style.webkitTransition = 'none';
    this.progressPath.style.strokeDasharray = ~~this.pathLength + ' ' + ~~this.pathLength;
    this.progressPath.style.strokeDashoffset = `${this.pathLength}`;
    this.progressPath.getBoundingClientRect();
    this.progressPath.style.transition = this.progressPath.style.webkitTransition = 'stroke-dashoffset 10ms linear';
    this.scrollHandler();

    this.listen.addEventListener('scroll', this.scrollHandler.bind(this));
  }

  public render() {
    return (
      <div
        className={`progress-wrap ` + (this.state.display?"active-progress":"hidden-progress")}
        onClick={this.backTop.bind(this)}
      >
        <svg className={`progress-circle svg-content`} width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"/>
        </svg>
      </div>
    )
  }
}