import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Collapse } from '@geist-ui/react';
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
    const list = this.state.list;

    const tagEle = (idxOfList: string) => {
      return (
        <Collapse
          title={idxOfList}
          className="tag-element"
          key={"tag_"+idxOfList}
        >
          <ul className="tag-sub-list">
            {
              list[idxOfList].map((val: any) => {
                return (
                  <li>
                    <Link href={{pathname: "/Article", query: {id: val.id}}} key={val.title+val.id}>
                      <div className="article-in-tag">
                        <div className={"article-title-in-tag"}>{val.title}</div>
                      </div>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </Collapse>
      )
    };

    return (
      <div id="tag-list-content">
        {/*<h2>Tags List</h2>*/}
        <Head>
          <title>{'Tag List - DeAnti Blog'}</title>
        </Head>
        <Collapse.Group id="tag-list">
          {
            Object.keys(list).map(tagEle)
          }
        </Collapse.Group>
      </div>
    )
  }
}