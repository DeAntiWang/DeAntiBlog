import * as React from 'react';
import Link from 'next/link';
import fetch from '../common/fetch';
import "../static/styles/Tags.scss";

interface Prop {
  list: any,
  [propsName: string]: any
}

interface State {
  list: any
}

export default class Tag extends React.Component<Prop, State> {
  public constructor(props: Prop) {
    super(props);
    this.state = {
      list: []
    };
  }

  static async getInitialProps() {
    const result = await fetch('/Article/findAll');
    let data: any = {};
    if(result.statusCode===200) {
      let workArr = JSON.parse(JSON.stringify(result.data));
      workArr.shift();  // shift About Me Article

      workArr.forEach((val: any) => {
        if(data[val.tag] === undefined) {
          data[val.tag] = [];
        }
        data[val.tag].push(val);
      })
    }
    Object.keys(data).forEach((idx: string) => {
      data[idx].sort((a: any, b: any) => {
        const aTime = new Date(a.time),
              bTime = new Date(b.time);
        if(aTime < bTime) {
          return 1;
        }else if(aTime > bTime) {
          return -1;
        }
        return 0;
      })
    });
    return { list: data };
  }

  public componentWillMount() {
    this.setState({
      list: this.props.list
    })
  }

  public render() {
    const tagEle = (idxOfList: any) => {
      return (
        <div className="tag-element" key={"tag_"+idxOfList}>
          <div className="tag-title">{idxOfList}</div>
          <div className="tag-sub-list">
            {
              this.props.list[idxOfList].map((val: any) => {
                return (
                  <Link href={{pathname: "/Article", query: {id: val.id}}} key={val.title+val.id}>
                    <div className="article-in-tag">
                      <div className={"article-title-in-tag"}>{val.title}</div>
                    </div>
                  </Link>
                )
              })
            }
          </div>
        </div>
      )
    };

    console.log(this.props.list);

    return (
      <div id="tag-list-content">
        {/*<h2>Tags List</h2>*/}
        <div id="tag-list">
          {
            Object.keys(this.props.list).map(tagEle)
          }
        </div>
      </div>
    )
  }
}