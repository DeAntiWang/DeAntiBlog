import * as React from 'react';
import { Input, Keyboard, Container, Select } from '@zeit-ui/react';
import ArticleCard from '../components/ArticleCard';
import DisplayImage from '../components/DisplayImage';
import KeyboardWrapper from "../components/KeyboardWrapper";
import Router from 'next/router';
import fetch from '../common/fetch';
import debounce from '../common/debounce';
import { xssOptions, BlogConfig } from '../config/options';
import '../static/styles/ArticleList.scss';

interface State {
  inputContent: string,
  list: Array<any>,
  wordNumLim: number
}

export default class ArticleList extends React.Component<any, State> {
  public constructor(props: any) {
    super(props);
    this.state = {
      inputContent: '',
      list: null,
      wordNumLim: 165
    };
  }

  // Attribute

  private _window: any = null;

  // Function

  private static dateFormat(timeStr: string): string {
    const time: Date = new Date(timeStr);
    const year = time.getFullYear(),
          month = time.getMonth()+1,
          day = time.getDate();
    return `${year}-${month}-${day}`;
  }

  // TODO 图片
  private static getImage(str: string): JSX.Element {
    let regex = /!\[([\s\S]*?)\]\(([\s\S]*?)\)/;
    let title = regex.exec(str)[1],
        src = regex.exec(str)[2];

    return (
      <DisplayImage alt={title} src={src}/>
    )
  }

  public static stringFilter(str: string, inHtml: boolean = true): string {
    // 链式工作，顺序不可替换
    const codeReplace = inHtml?'<span class="-in-desc-code">(请文中查看代码)</span>':''

    const ret = str.replace(/\r\n/g, "\n")  // 预处理
      .replace(/\<MusicPlayer([\s\S]*)\/\>/g, "")  // 音乐播放器
      .replace(/(#+)([^\n]*)/g, "$2: ") // 标题
      .replace(/!\[([\s\S]*?)\]\(([\s\S]*?)\)/g, "")  // 图片
      .replace(/\[([\s\S]*?)\]\([\s\S]*?\)/g, "$1") // 链接
      .replace(/\n(&gt;|\>)\s?(.*)/g, "$2")  // 引用（有问题）
      .replace(/(\*\*\*|___)(.*?)\1/g, "$2") // 斜体粗体混合
      .replace(/(\*\*|__)(.*?)\1/g, "$2") // 粗体
      .replace(/(\*|_)(.*?)\1/g, "$2") // 斜体
      .replace(/\~\~(.*?)\~\~/g, "$1") // 删除线
      .replace(/```([^`\n]*)```/g, "$1")  // 行内代码
      .replace(/```([\s\S]*?)```[\s]?/g, codeReplace)  // 代码块
      .replace(/^-+$/g, "") // 分割线
      .replace(/^[\s]*[-\*\+] +(.*)/g, "$1") // 无序列表
      .replace(/^[\s]*[0-9]+\.(.*)/g, "$1") // 有序列表
      .replace(/\$\$(.*)\$\$/, codeReplace)  // latex公式
      .replace(/\$(.*)\$/, codeReplace);  // latex行内公式
    const xss = require('xss');
    return xss(ret, xssOptions);
  }

  private search(str: string) {
    if(str==="" || str===null) {
      this.setState({
        list: this.props.list
      });
      return;
    }

    let ans: any = [];
    const obj: Array<any>= this.props.list;
    obj.forEach((val: any) => {
      const objStr = val.title.toLowerCase() + val.content.toLowerCase() + val.time.toLowerCase();
      if(objStr.indexOf(str.toLowerCase()) !== -1) {
        ans.push(val);
      }
    });
    this.setState({
      list: ans
    });
  }

  private debounceSearch = debounce(this.search.bind(this));

  // Event Handler

  private onChange(ev: any) {
    this.setState({inputContent: ev.target.value});
    // search content
    this.debounceSearch(ev.target.value);
  }

  private onSelect(val: string) {
    switch(val) {
      case 'publish_desc':
        this.setState({
          list: this.state.list.sort((a: any, b: any) => {
            let aTime = new Date(a.time),
                bTime = new Date(b.time);
            if(aTime < bTime) {
              return 1;
            }else if(aTime > bTime) {
              return -1;
            }
            return 0;
          })
        });
        break;
      case 'publish_asc':
        this.setState({
          list: this.state.list.sort((a: any, b: any) => {
            let aTime = new Date(a.time),
              bTime = new Date(b.time);
            if(aTime > bTime) {
              return 1;
            }else if(aTime < bTime) {
              return -1;
            }
            return 0;
          })
        });
        break;
      case 'edit_desc':
        this.setState({
          list: this.state.list.sort((a: any, b: any) => {
            let aTime = new Date(a.edit_time),
              bTime = new Date(b.edit_time);
            if(aTime < bTime) {
              return 1;
            }else if(aTime > bTime) {
              return -1;
            }
            return 0;
          })
        });
        break;
      case 'edit_asc':
        this.setState({
          list: this.state.list.sort((a: any, b: any) => {
            let aTime = new Date(a.edit_time),
              bTime = new Date(b.edit_time);
            if(aTime > bTime) {
              return 1;
            }else if(aTime < bTime) {
              return -1;
            }
            return 0;
          })
        });
        break;
    }
  }

  private static onClickList(event: MouseEvent) {
    event.preventDefault();
    let ev = event || window.event;
    let target: any = ev.target || ev.srcElement;

    if(target.classList.indexOf('go-link')!==-1) {
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

  private keyDownToFocus(ev: any) {
    if(ev.keyCode === 191) {
      ev.preventDefault();
      const input = document.querySelector("input[type=\"text\"]") as HTMLElement;
      input.focus();
    }
  }

  // Life Circle

  static async getInitialProps() {
    const result = await fetch('/Article/findAll');
    let data: any = [];
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

      data = data.map( (val: any) => {
        return {
          id: val.id,
          title: val.title,
          time: ArticleList.dateFormat(val.time),
          content: val.content,   // for search func
          desc: ArticleList.stringFilter(val.content)
        }
      });
    }
    return { list: data };
  }

  public componentWillMount() {
    this.setState({
      list: this.props.list
    })
  }

  public componentDidMount() {
    if(this._window===null) {
      this._window = window;
      window.addEventListener('keydown', this.keyDownToFocus.bind(this));
    }

    this.setState({wordNumLim: document.body.offsetWidth < 600 ? 85 : 165});
    this._window.onresize = () => {
      this.setState({wordNumLim: document.body.offsetWidth < 600 ? 85 : 165});
    }
  }

  public render() {
    const SearchIcon = () => {
      return (
        <Container>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#999"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-search"
            style={{width: "14px", height: "14px"}}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </Container>
      );
    };

    const MyKeyBoard = () => {
      return (
        <Keyboard
          id={"keyboard"}
          small
        >/</Keyboard>
      );
    };

    const listElement = (val: any) => {
      return (
        <ArticleCard
          key={val.id}
          id={val.id}
          title={val.title}
          time={val.time}
          desc={val.desc.substr(0, this.state.wordNumLim)}
        />
      );
    };

    return (
      <div id="article-list-content">
        <div id={"input-bar"}>
          <Input
            size={"medium"}
            icon={<SearchIcon />}
            iconRight={<MyKeyBoard />}
            placeholder={"Search..."}
            value={this.state.inputContent}
            onChange={this.onChange.bind(this)}
          />
          <Select
            initialValue={"publish_desc"}
            size={"medium"}
            onChange={this.onSelect.bind(this)}
          >
            <Select.Option value="publish_desc">发布时间降序</Select.Option>
            <Select.Option value="publish_asc">发布时间升序</Select.Option>
            <Select.Option value="edit_desc">编辑时间降序</Select.Option>
            <Select.Option value="edit_asc">编辑时间升序</Select.Option>
          </Select>
        </div>
        <div className={"list"} onClick={ArticleList.onClickList.bind(this)}>
          {
            this.state.list===null?
              this.props.list.map(listElement)
              :this.state.list.map(listElement)
          }
        </div>
      </div>
    );
  }
}