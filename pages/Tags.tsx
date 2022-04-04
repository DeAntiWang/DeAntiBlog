import { Collapse } from '@geist-ui/react';
import Layout from 'components/Layout';
import TagElement from 'components/TagElement';
import fetch, { Status } from 'utils/fetch';
import styles from 'styles/tags.module.scss';
import type { Article } from 'types/Article';

type Props = {
  list: Record<string, Article[]>;
};

const Tag = ({ list }: Props): JSX.Element => (
  <Layout title='Tags List - DeAnti Blog'>
    <div className={styles.tagListContent}>
      <Collapse.Group className={styles.tagList}>
        {
          Object.keys(list || {}).map((key: string) => (
            <TagElement
              title={key}
              list={list[key]}
              key={`tag-${key}`}
            />
          )) ?? <div className={styles.empty}>- 暂无文章 -</div>
        }
      </Collapse.Group>
    </div>
  </Layout>
);

export async function getServerSideProps() {
  const result = await fetch('/Article/findAll');
  if (result.statusCode !== Status.Success) return { list: {} };

  const data = [...result.data].slice(1).reduce((res, val) => {
    if (res[val.tag] === undefined) res[val.tag] = [];
    res[val.tag].push(val);
  }, {});

  Object.keys(data).forEach((idx: string) => {
    data[idx].sort((a: Article, b: Article) => {
      const aTime = new Date(a.time);
      const bTime = new Date(b.time);
      if (aTime < bTime) return 1;
      if(aTime > bTime) return -1;
      return 0;
    })
  });
  
  return { props: { list: data } };
}

export default Tag;
