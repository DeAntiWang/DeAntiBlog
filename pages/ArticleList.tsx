import * as React from 'react';
import MenuBar from '../components/MenuBar';
import ArticleCard from '../components/ArticleCard';
import Router from 'next/router';
import fetch from '../common/fetch';
import '../styles/ArticleList.scss';


export default class ArticleList extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  private static dataFormater(timeStr: string): string {
    const time: Date = new Date(timeStr);
    const year = time.getFullYear(),
          month = time.getMonth()+1,
          day = time.getDate();
    return `${year}-${month}-${day}`;
  }

  private static stringFilter(str: string): string {
    // 链式工作，顺序不可替换
    return str.replace(/\r\n/g, "\n")  // 预处理
      .replace(/^(#+)(.*)/g, "$2。") // 标题
      .replace(/\[([\s\S]*?)\]\([\s\S]*?\)/g, "$1") // 链接
      .replace(/\n(&gt;|\\>)\s?(.*)/g, "$2")  // 引用（有问题）
      .replace(/(\\*\\*\\*|___)(.*?)\\1/g, "$2") // 斜体粗体混合
      .replace(/(\\*\\*|__)(.*?)\\1/g, "$2") // 粗体
      .replace(/(\\*|_)(.*?)\\1/g, "$2") // 斜体
      .replace(/!\\[[^\\]]+\\]\\([^\\)]+\\)/g, "") // TODO 图片
      .replace(/\\~\\~(.*?)\\~\\~/g, "$1") // 删除线
      .replace(/```([\\s\\S]*?)```[\\s]?/g, '<span class="-in-desc-code">请文中查看代码</span>')  // 代码块
      .replace(/^-+$/g, "") // 分割线
      .replace(/^[\\s]*[-\\*\\+] +(.*)/g, "$1"); // 无序列表
  }

  private static onClickList(event: MouseEvent) {
    event.preventDefault();
    let ev = event || window.event;
    let target: any = ev.target || ev.srcElement;

    if(target.className.indexOf('go-link')!==-1) {
      let targetDom = target;
      while(targetDom.className.indexOf('card')===-1) {
        targetDom = targetDom.parentElement;
      }
      const articleId: number = parseInt(targetDom.id.substr(7));

      Router.push({
        pathname: '/Article',
        query: {
          id: articleId
        }
      })
    }
  }

  static async getInitialProps() {
    const result = await fetch('/Article/findAll');
    let data: any = {};
    if(result.statusCode===200) {
      data = result.data.map( (val: any) => {
        return {
          id: val.id,
          title: val.title,
          time: ArticleList.dataFormater(val.time),
          desc: ArticleList.stringFilter(val.content).substr(0,160)
        }
      });
      data.shift();
    }
    return { list: data };
  }

  public render() {

    // TODO 点击跳转替换到Title上，内容允许select，注意background

    return (
        <div id={"article-list-page"}>
          <MenuBar type={"left-side"} />
          <div id={"right-content"}>
            <div className={"list"} onClick={ArticleList.onClickList.bind(this)}>
              {
                this.props.list.map((val: any) => {
                  return (
                    <ArticleCard
                      key={val.id}
                      id={val.id}
                      title={val.title}
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