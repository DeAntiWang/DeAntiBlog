import Router from 'next/router';
import Head from 'next/head';
import fetch from 'common/fetch';
// import Component
import SponsorModal from 'components/SponsorModal/SponsorModal';
import ArticleList from './ArticleList';
import ArticleBar from 'components/ArticleBar/ArticleBar';
// import lib
import Markdown from "markdown-to-jsx";
// import css ans options
import { MathJaxConfig } from 'config/inline-script';
import { ArticleBarOption, BlogConfig, md2jsxOptions } from 'config/options';
import 'styles/Article.scss';

export default function Article(props: any) {
  // document.querySelectorAll('pre code').forEach((block) => {
  //   hljs.highlightBlock(block);
  // });

  const mdText: string = props.data ? props.data.content : "";

  const articleInfo = {
    url: `${BlogConfig.baseURL}/Article?id=${props.id}`,
    title: (props.data && props.data.title) || "",
    summary: ArticleList.stringFilter(mdText, false).replace(/\r*\n/g, ""),
    img: ""
  };

  return (
    <div className={"article"}>
      <Head>
        <title>{articleInfo.title+' - DeAnti Blog'}</title>
        <script type={"text/x-mathjax-config"} dangerouslySetInnerHTML={{ __html: MathJaxConfig() }}></script>
        <script type={"text/javascript"} src="static/MathJax/MathJax.js"></script>
      </Head>
      {
        +props.id !== 0 &&
          (<>
            <ArticleBar
              normal={ArticleBarOption.normal}
              share={ArticleBarOption.share}
              className={"-function-bar"}
            />
            <SponsorModal/>
          </>)
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