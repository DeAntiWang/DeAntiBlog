import { Card, Tag } from '@geist-ui/react';
import type { Article } from 'types/Article';
import styles from 'styles/ArticleCard.module.scss';

interface Props extends Pick<Article, 'id' | 'title' | 'tag' | 'time'> {
  desc: string;
};

const ArticleCard = ({ id, title, desc, tag, time }: Props): JSX.Element => (
  <Card
    className={styles.articleCard}
    data-id={`article-${id}`}
    hoverable
    shadow
  >
    <a style={{color: 'unset'}}><h4 className={"go-link"} style={{marginBottom: "0"}}>{title}</h4></a>
    <div style={{fontWeight: "lighter", fontSize: '13px'}}>
      <span>{time}</span>
      <Tag type="secondary" style={{marginLeft: "10px", fontWeight: "normal"}}>{tag}</Tag>
    </div>
    <div className={styles.desc} dangerouslySetInnerHTML={{__html: desc}}/>
  </Card>
);

export default ArticleCard;
