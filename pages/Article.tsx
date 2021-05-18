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
import { ArticleBarOption, BlogConfig, md2jsxOptions } from 'config/options';
import 'styles/Article.scss';

export default function Article(props: any) {
  const MathJaxConfigStr = `MathJax.Hub.Config({
    skipStartupTypeset: false,
    jax: ["input/TeX", "output/SVG"],
    extensions: ["tex2jax.js", "toMathML.js"],
    TeX: {
      extensions: ["noUndefined.js", "autoload-all.js", "AMSmath.js", "AMSsymbols.js", "mediawiki-texvc.js"],
      mhchem: { legacy: false },
      MAXBUFFER: 10*1024
    },
    SVG: {
      useGlobalCache: false,
      merrorStyle: {
        fontSize:"90%", color:"red", background:"",
            border: "1px solid red", padding:"2px"
      },
      scale: 100, 
      minScaleAdjust: 80,
      blacker: 0,
      matchFontHeight: false,
      undefinedFamily: "STIXGeneral, 'PingFang SC', serif"
    },
    showProcessingMessages: false,
    tex2jax: {
      displayMath: [['$$', '$$'], ['$$\n', '\n$$'], ['$$\r\n', '\r\n$$']],
      inlineMath: [['$','$']],
      processEscapes: true,
      preview: "none",
      skipTags: ["script","noscript","style","textarea","pre","code", "span"],
      processClass: "md-inline-math|inline-math-export-jax|math-in-toc|test"
    },
    menuSettings: {
      inTabOrder: false
    },
    showMathMenu: false,
    positionToHash: false
  });
  MathJax.Hub.processSectionDelay = 0;
  MathJax.Hub.processUpdateTime = 25;
  MathJax.Hub.processUpdateDelay = 0;
  MathJax.Hub.Queue(["setRenderer", MathJax.Hub, "SVG"]);
  MathJax.Hub.Register.StartupHook("TeX autoload-all Ready", function () {
    var MACROS = MathJax.InputJax.TeX.Definitions.macros;
    MACROS.color = "Color";
    delete MACROS.colorbox;
    delete MACROS.fcolorbox;
  });`;

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
        <script type={"text/x-mathjax-config"} dangerouslySetInnerHTML={{__html: MathJaxConfigStr}}></script>
        <script type={"text/javascript"} src="static/MathJax/MathJax.js" async></script>
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