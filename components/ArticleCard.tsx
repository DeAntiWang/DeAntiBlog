import * as React from 'react';
import { Card, Tag } from '@zeit-ui/react';
import '../static/styles/ArticleCard.scss';

interface Prop {
  // title time desc id tag
  title: string,
  time: string,
  desc: string,
  id: number,
  tag: string,
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
          <h4 className="go-link" style={{marginBottom: "0 !important"}}>{this.props.title}</h4>
          <div style={{fontWeight: "lighter", fontSize: '13px'}}>
            <span>{this.props.time}</span>
            <Tag type="secondary" style={{marginLeft: "10px"}}>{this.props.tag}</Tag>
          </div>
          <p className="desc" dangerouslySetInnerHTML={{__html:desc}} />
        </Card>
    );
  }
}