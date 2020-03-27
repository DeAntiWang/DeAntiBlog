import * as React from 'react';
import MenuBar from '../components/MenuBar';
import ArticleCard from '../components/ArticleCard';
import Link from 'next/link';
import Router from 'next/router';
import '../styles/ArticleList.scss';


export default class ArticleList extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);

    const DESC:string =  'pages目录是nextjs中最终要的一个目录，这个目录的每一个文件都会对应到每一个页面，' +
      '可以根据地址栏的路由进行跳转。若pages下的js文件在一个目录下，那么nextjs默认会将这个目录也当作路由的路径。' +
      '个文件都会对应到每一个页面，可以根据地址栏的路由';

    this.state = {
      res: [
        {
          id: 1,
          title: 'The Evil Rabbit',
          time: '2020-02-23',
          desc: DESC
        }, {
          id: 2,
          title: 'The Evil Rabbit',
          time: '2020-02-23',
          desc: DESC
        }, {
          id: 3,
          title: 'The Evil Rabbit',
          time: '2020-02-23',
          desc: DESC
        }, {
          id: 4,
          title: 'The Evil Rabbit',
          time: '2020-02-23',
          desc: DESC
        }, {
          id: 5,
          title: 'The Evil Rabbit',
          time: '2020-02-23',
          desc: DESC
        }, {
          id: 6,
          title: 'The Evil Rabbit',
          time: '2020-02-23',
          desc: DESC
        }
      ]
    }
  }

  private onClickList(event: MouseEvent) {
    event.preventDefault();
    let ev = event || window.event;
    let target = ev.target || ev.srcElement;
    // if(target.nodeName.toLocalLowerCase() === 'div') {

    // }
  }

  public render() {
    return (
        <div id={"article-list-page"}>
          <MenuBar type={"left-side"} />
          <div id={"right-content"}>
            <div className={"list"} onClick={this.onClickList.bind(this)}>
              {
                this.state.res.map((val: any) => {
                  return (
                    <ArticleCard
                      key={val.id}
                      id={val.id}
                      title={val.title + val.id}
                      time={val.time}
                      desc={val.desc}
                    />
                  );
                })
              }
            </div>
          </div>
        </div>
    );
  }
}