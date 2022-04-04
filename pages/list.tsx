import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import FilterBar, { FilterType } from 'components/FilterBar';
import ArticleCard from 'components/ArticleCard';
import { debounce } from 'utils/debounce';
import fetch, { Status } from 'utils/fetch';
import { dateFormat, stringFilter } from 'utils/format';
import styles from 'styles/list.module.scss';
import type { Article } from 'types/Article';

type Props = { 
  articleList: Article[];
};

const ArticleList = ({ articleList }: Props): JSX.Element => {
  const router = useRouter();
  const [list, setList] = useState([]);

  const onClick = (event): void => {
    event.preventDefault();
    const ev = event || window.event;
    const target: HTMLElement = ev.target || ev.srcElement;
  
    if(target.className.indexOf('go-link') !== -1) {
      let targetDom = target;
      while (targetDom.className.indexOf('card') === -1) {
        targetDom = targetDom.parentElement;
      }
  
      const articleId: number = parseInt(targetDom.dataset?.id?.slice(7), 10);
      router.push(`/article/${articleId}`);
    }
  };

  const onSearch = debounce((str: string): void => {
    if (str ?? '' === '') {
      setList(articleList);
      return;
    }

    const filterList: Article[] = articleList.reduce((ans: Article[], now: Article): Article[] => {
      const { title, content, time } = now;
      const objStr = `${title}${content}${time}`.toLowerCase();
      if(objStr.indexOf(str.toLowerCase()) !== -1) return [...ans, now];
      return ans;
    }, []);
    setList(filterList);
  });

  const onSelect = (filterType: FilterType): void => {
    const { PUBLIST_ASC, PUBLIST_DESC, EDIT_ASC } = FilterType;
    const newList = list.sort((a: Article, b: Article) => {
      const aTime = new Date((filterType === PUBLIST_ASC || PUBLIST_DESC) ? a.time : a.edit_time);
      const bTime = new Date((filterType === PUBLIST_ASC || PUBLIST_DESC) ? b.time : b.edit_time);
      if (filterType === PUBLIST_ASC || EDIT_ASC) {
        if (aTime > bTime) return 1;
        if (aTime < bTime) return -1;
        return 0;
      } else {
        if (aTime < bTime) return 1;
        if(aTime > bTime) return -1;
        return 0;
      }
    });
    setList([...newList]);
  };

  useEffect(() => { setList(articleList); }, [articleList]);

  return (
    <Layout title='Article List - DeAnti Blog'>
      <div className={styles.articleList}>
        <div className={styles.inputBar}>
          <FilterBar onChange={onSearch.bind(this)} onSelect={onSelect.bind(this)}/>
        </div>
        <div className={styles.list} onClick={onClick.bind(this)}>
          {
            list?.map((val: any) => (
              <ArticleCard
                key={val.id}
                id={val.id}
                title={val.title}
                time={val.time}
                desc={val.desc}
                tag={val.tag}
              />
            )) ?? <div className={styles.empty}>- 暂无文章 -</div>
          }
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const result = await fetch('/Article/findAll');
  if(result.statusCode !== Status.Success) return { props: { articleList: [] } };

  const data: Array<Article> = [...result.data.slice(1)];
  const list = data.sort((a: any, b: any) => {
    const aTime = new Date(a.time);
    const bTime = new Date(b.time);
    if (aTime < bTime) return 1;
    if (aTime > bTime) return -1;
    return 0;
  }).map((val: any) => ({
    id: val.id,
    title: val.title,
    time: dateFormat(val.time),
    edit_time: dateFormat(val.edit_time),
    content: val.content,   // for search func
    desc: stringFilter(val.content),
    tag: val.tag
  }));
  return { props: { articleList: list } };
}

export default ArticleList;
