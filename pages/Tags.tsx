import Head from 'next/head';
import { Collapse } from '@geist-ui/react';
import fetch from 'common/fetch';
import TagElement from 'components/TagElement/TagElement';
import "styles/Tags.scss";

interface Prop {
  list: any,
  [propsName: string]: any
}

export default function Tag(props: Prop) {
  const list = props.list;

  return (
    <div id={"tag-list-content"}>
      <Head>
        <title>{'Tags List - DeAnti Blog'}</title>
      </Head>
      <Collapse.Group id={"tag-list"}>
        {
          Object.keys(list).map((key: string) => (
            <TagElement
              title={key}
              list={list[key]}
              key={`tag-${key}`}
            />
          ))
        }
      </Collapse.Group>
    </div>
  )
}

Tag.getInitialProps = async () => {
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