import Router from 'next/router';
import Head from 'next/head';
import fetch from '../common/fetch';
import { htmlEncode } from '../common/format';
import { useModal } from '@geist-ui/react';
import { useEffect, createContext } from 'react';
// import Component
import SponsorModal from '../components/SponsorModal/SponsorModal';
import ArticleBar from '../components/ArticleBar/ArticleBar';
import { stringFilter }  from "../common/format";
// import lib
import Markdown from "markdown-to-jsx";
import hljs from "highlightjs";
// import css ans options
import { BlogConfig, md2jsxOptions } from '../configs/options';
import { coin, qq, qqzone, weibo } from '../static/svgs';
import '../styles/Article.scss';
import 'highlightjs/styles/a11y-light.css';

export const SponsorContext = createContext({
  visible: false,
  setVisible: undefined,
  bindings: undefined
});
export default function Article(props: any) {
  const { visible, setVisible, bindings } = useModal();

  const mdText: string = props.data ? props.data.content : ""; // 文章内容
  const articleInfo = { // 文章信息
    url: `${BlogConfig.baseURL}/Article?id=${props.id}`,
    title: (props.data && props.data.title) || "",
    summary: stringFilter(mdText, false).replace(/\r*\n/g, ""),
    img: ""
  };

  const ArticleBarOption = {
    normal: [
      {
        icon: coin,
        onClick: () => {
          setVisible(true);
        }
      }
    ],
    share: [
      {
        icon: qq,
        onClick: () => {
          const url = htmlEncode(articleInfo.url),
                title = htmlEncode(articleInfo.title),
                summary = htmlEncode(articleInfo.summary),
                img = htmlEncode(articleInfo.img);
  
          let str = `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&summary=${summary}&pics=${img}`;
          window.open(str);
        }
      },
      {
        icon: qqzone,
        onClick: () => {
          const url = htmlEncode(articleInfo.url),
                title = htmlEncode(articleInfo.title),
                summary = htmlEncode(articleInfo.summary),
                img = htmlEncode(articleInfo.img);
  
          let str = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&desc=${summary}&summary=${summary}&pics=${img}`;
          window.open(str)
        }
      },
      {
        icon: weibo,
        onClick: () => {
          const url = htmlEncode(articleInfo.url),
                desc = htmlEncode(articleInfo.summary),
                img = htmlEncode(articleInfo.img);
  
          let str = `http://service.weibo.com/share/mobile.php?url=${url}&title=${desc}&pic=${img}`;
          window.open(str);
        }
      }
    ]
  };

  useEffect(() => {
    const _window: any = window;
    document.querySelectorAll('pre code').forEach((block: any) => {
      hljs.highlightBlock(block);
    });
    _window.MathJax.Hub.Queue(['Typeset', _window.MathJax.Hub, document.getElementById("need-latex-render")])
  });

  return (
    <div className={"article"}>
      <Head>
        <title>{articleInfo.title+' - DeAnti Blog'}</title>
      </Head>
      {
        +props.id !== 0 &&
          (<SponsorContext.Provider value={{visible, setVisible, bindings}}>
            <ArticleBar
              normal={ArticleBarOption.normal}
              share={ArticleBarOption.share}
              className={"-function-bar"}
            />
            <SponsorModal/>
          </SponsorContext.Provider>)
      }
      <Markdown options={md2jsxOptions} id={"need-latex-render"}>
        {mdText}
      </Markdown>
    </div>
  );
}

Article.getInitialProps = async ({res, query}: any) => {
  const id = query.id || 0;
  const result = await fetch('/Article/findById', 'GET', { id });

  if(result.statusCode === 200 && result.data) {
    const data = Object.assign({}, result.data);
    return { data: data, id: query.id };
  } else {
    if(!res) {
      Router.push('/404');
    } else {
      res.writeHead(301, { Location: '404' });
      res.end();
    }
    return {data: {}, id: query.id};
  }
}