import * as React from 'react';
import { Card } from '@zeit-ui/react';
import '../static/styles/ArticleCard.scss';

interface Prop {
  // title time desc id
  title: string,
  time: string,
  desc: string,
  id: number,
  [propName: string]: any
}

export default class ArticleCard extends React.Component<Prop, any> {
  public constructor(props: Prop) {
    super(props);
    this.state = {

    }
  }

  public render() {
    const desc = this.props.desc + '<span class="-in-desc go-link"> ... Read more</span>';

    return (
        <Card
          id={"Article"+this.props.id}
          className={"article-card"}
          style={{margin: '15px 0', background: 'rgba(255,255,255,0.3)'}}
          hoverable
          shadow
        >
          <h4 className="go-link">{this.props.title}</h4>
          <div style={{fontWeight: "lighter", fontSize: '13px'}}>{this.props.time}</div>
          <p className="desc" dangerouslySetInnerHTML={{__html:desc}} />
        </Card>
    );
  }
}