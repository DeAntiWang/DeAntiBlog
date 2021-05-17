import { Card, Tag } from '@geist-ui/react';
import style from 'styles/ArticleCard.module.scss';

interface Prop {
  // title time desc id tag
  title: string,
  time: string,
  desc: string,
  id: number,
  tag: string,
  [propName: string]: any
}

export default function ArticleCard(props: Prop) {
  const desc = props.desc + `<span class="${style["-in-desc"]} ${style["go-link"]}"> ... Read more</span>`;

  return (
    <Card
      id={"Article"+props.id}
      className={style["article-card"]}
      style={{margin: '15px 0', background: 'rgba(255,255,255,0.3)'}}
      hoverable
      shadow
    >
      <a style={{color: 'unset'}}><h4 className={style["go-link"]} style={{marginBottom: "0"}}>{props.title}</h4></a>
      <div style={{fontWeight: "lighter", fontSize: '13px'}}>
        <span>{props.time}</span>
        <Tag type="secondary" style={{marginLeft: "10px"}}>{props.tag}</Tag>
      </div>
      <p className={style.desc} dangerouslySetInnerHTML={{__html:desc}} />
    </Card>
  );
}