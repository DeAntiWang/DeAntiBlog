import * as React from 'react';
import { Card } from '@zeit-ui/react';
import {ZEITUIProvider, CSSBaseline} from "@zeit-ui/react";
import '../styles/ArticleCard.scss';

interface Prop {
  // title time desc id
  [propName: string]: any
}

export default class ArticleCard extends React.Component<any, any> {
  public constructor(props: Prop) {
    super(props);
    this.state = {
      title: 'The Evil Rabbit',
      time: '2020-02-23',
      desc: 'pages目录是nextjs中最终要的一个目录，这个目录的每一个文件都会对应到每一个页面，可以根据地址栏的路由进行跳转。若pages下的js文件在一个目录下，那么nextjs默认会将这个目录也当作路由的路径。个文件都会对应到每一个页面，可以根据地址栏的路由'
    }
  }

  public render() {
    return (
        <Card
          className={"article-card"}
          style={{margin: '15px 0', background: 'rgba(255,255,255,0.3)'}}
          hoverable
          shadow
        >
          <h4>{this.state.title}</h4>
          <div style={{fontWeight: "lighter", fontSize: '13px'}}>{this.state.time}</div>
          <p>{this.state.desc}</p>
        </Card>
    );
  }
}