import { useEffect, useState } from 'react';
import FilterBar from '../components/FilterBar/FilterBar';
import ArticleCard from '../components/ArticleCard';
import Router from 'next/router';
import Head from 'next/head';
import fetch from '../common/fetch';
import debounce from '../common/debounce';
import { stringFilter, dateFormat }  from "../common/format";
import '../styles/ArticleList.scss';

interface ListElement {
  [key: string]: any
}

interface Prop {
  list: Array<ListElement>
}

export default function ArticleList(props: Prop) {
  const [list, setList] = useState(null);

  const onClickList = (event: MouseEvent) => {
    event.preventDefault();
    let ev = event || window.event;
    let target: any = ev.target || ev.srcElement;
  
    if(target.className.indexOf('go-link') !== -1) {
      let targetDom = target;
      while(targetDom.className.indexOf('card') ===- 1) {
        targetDom = targetDom.parentElement;
      }
  
      const articleId: number = +targetDom.id.substr(7);
  
      Router.push({
        pathname: '/Article',
        query: {
          id: articleId
        }
      });
    }
  }

  const search = debounce((str: string) => {
    if(str==="" || str===null) {
      setList(props.list);
      return;
    }

    let ans: any = [];
    const obj: Array<any>= props.list;
    obj.forEach((val: any) => {
      const objStr = val.title.toLowerCase() + val.content.toLowerCase() + val.time.toLowerCase();
      if(objStr.indexOf(str.toLowerCase()) !== -1) {
        ans.push(val);
      }
    });
    setList(ans);
  });

  const onSelect = (val: string) => {
    let newList = null;
    switch(val) {
      case 'publish_asc':
        newList = list.sort(
          (a: any, b: any) => {
            const aTime = new Date(a.time);
            const bTime = new Date(b.time);
            if (aTime > bTime) return 1;
            else if (aTime < bTime) return -1;
            else return 0;
          });
        break;
      case 'edit_desc':
        newList = list.sort(
          (a: any, b: any) => {
            const aTime = new Date(a.edit_time);
            const bTime = new Date(b.edit_time);
            if (aTime < bTime) return 1;
            else if(aTime > bTime) return -1;
            else return 0;
          });
        break;
      case 'edit_asc':
        newList = list.sort(
          (a: any, b: any) => {
            const aTime = new Date(a.edit_time);
            const  bTime = new Date(b.edit_time);
            if (aTime > bTime) return 1;
            else if(aTime < bTime) return -1;
            else return 0;
          });
        break;
      default:
      case 'publish_desc':
        newList = list.sort(
          (a: any, b: any) => {
            const aTime = new Date(a.time);
            const bTime = new Date(b.time);
            if (aTime < bTime) return 1;
            else if (aTime > bTime) return -1;
            else return 0;
          });
        break;
    }
    newList = [...newList];
    setList(newList);
  };

  const keyDownToFocus = (ev: any) => {
    if(ev.keyCode === 191) {
      ev.preventDefault();
      const input = document.querySelector("input[type=\"text\"]") as HTMLElement;
      input.focus();
    }
  }

  useEffect(() => {
    setList(props.list);
    window.addEventListener('keydown', keyDownToFocus);

    return () => {
      window.removeEventListener('keydown', keyDownToFocus);
    }
  }, []);

  return (
    <div id={"article-list-content"}>
      <Head>
        <title>{'Article List - DeAnti Blog'}</title>
      </Head>
      <div id={"input-bar"}>
        <FilterBar changeCallback={search} onSelect={onSelect}/>
      </div>
      <div className={"list"} onClick={onClickList.bind(this)}>
        {
          (list || props.list)
            .map((val: any) => 
              <ArticleCard
                key={val.id}
                id={val.id}
                title={val.title}
                time={val.time}
                desc={val.desc}
                tag={val.tag}
              />)
        }
      </div>
    </div>
  );
}

ArticleList.getInitialProps = async () => {
  const result = await fetch('/Article/findAll');
  let data: Array<ListElement> = [];
  if(result.statusCode===200) {
    data = result.data;
    data.shift();

    data.sort((a: any, b: any) => {
      const aTime = new Date(a.time),
            bTime = new Date(b.time);
      if(aTime<bTime) {
        return 1;
      }else if(aTime>bTime){
        return -1;
      }
      return 0;
    });

    data = data.map((val: any) => {
      return {
        id: val.id,
        title: val.title,
        time: dateFormat(val.time),
        edit_time: dateFormat(val.edit_time),
        content: val.content,   // for search func
        desc: stringFilter(val.content),
        tag: val.tag
      }
    });
  }
  return { list: data };
}