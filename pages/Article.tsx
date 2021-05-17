import * as React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import fetch from 'common/fetch';
// import Component
import SponsorModal from 'components/SponsorModal/SponsorModal';
import ArticleList from './ArticleList';
import ArticleBar from 'components/ArticleBar/ArticleBar';

// import hljs lib
import * as hljs from 'highlightjs';
import 'highlightjs/styles/a11y-light.css';
// import react-html-replace lib
// @ts-ignore: have no @types/react-html-replace
import reactHtmlReplace from 'react-html-replace';
// import abcjs lib
// @ts-ignore: have no @types/abcjs
import abcjs from "abcjs";
import 'abcjs/abcjs-audio.css';

import { replaceTags, ArticleBarOption, BlogConfig } from '../config/options';
import 'static/styles/Article.scss';

declare const ABCJS: {
  renderAbc(element: HTMLElement, text: string): void;
};

export default class Article extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalOpen: false,
      tocOpen: false
    };
  }

  static async getInitialProps({res, query}: any) {
    const id = query.id===undefined?0:query.id;
    const result = await fetch('/Article/findById', 'GET', {id});
    let data: any = {};
    if(result.statusCode===200) {
      data = {...result};
    }
    if(data.statusCode===200 && (data.data===undefined || data.data.content===undefined)) {
      if(res===undefined) {
        Router.push('/404');
      }else {
        res.writeHead(301, {Location: '404'});
        res.end();
      }
    }
    return {data: data, id: query.id};
  }

  private codeToLatexSpan() {
    document.querySelectorAll('code').forEach(code => {
      const text = code.innerHTML;
      let is_inline_math = /^\$(.*)\$$/.exec(text);
      let is_display_math = /^\$\$(.*)\$\$$/ms.exec(text) || /^\\begin\{.+\}(.*)\\end\{.+\}/ms.exec(text);
      if (is_inline_math || is_display_math) {
        code.parentElement.classList.add('has-jax');
        if (is_inline_math) {
          code.outerHTML = "<span class=yuuki_mathjax_inline>" + text + "</span>";
        } else {
          code.outerHTML = "<span class=yuuki_mathjax_display>" + text + "</span>";
        }
      }
    });
  }

  private renderLatex() {
    const _window: any = window;

    // 解决md，latex syntax冲突
    _window.addEventListener('load', this.codeToLatexSpan());


    if(_window.$latexRender === undefined) {
      const scriptConfig = document.createElement('script');
      scriptConfig.type = "text/x-mathjax-config";
      scriptConfig.innerHTML = "MathJax.Hub.Config({\n" +
        "      showProcessingMessages: false, //关闭js加载过程信息\n" +
        "      messageStyle: \"none\", //不显示信息\n" +
        "      jax: [\"input/TeX\", \"output/HTML-CSS\"],\n" +
        "      tex2jax: {\n" +
        "        inlineMath: [[\"$\", \"$\"], [\"\\\\(\", \"\\\\)\"]], //行内公式选择符\n" +
        "        processEscapes: true, " +
        "        displayMath: [[\"$$\", \"$$\"], [\"\\\\[\", \"\\\\]\"]], //段内公式选择符\n" +
        "        skipTags: [\"script\", \"noscript\", \"style\", \"textarea\", \"pre\", \"code\", \"a\"] //避开某些标签\n" +
        "      },\n" +
        "      \"HTML-CSS\": {\n" +
        "        availableFonts: [\"STIX\", \"TeX\"], //可选字体\n" +
        "        showMathMenu: false //关闭右击菜单显示\n" +
        "      }\n" +
        "    });";

      const script = document.createElement('script');
      script.type = "text/javascript";
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML";

      const scriptRun = document.createElement('script');
      scriptRun.type = "text/javascript";
      script.innerHTML = "window.$latexRender = () => MathJax.Hub.Queue([\"Typeset\", MathJax.Hub, document.getElementById(\"need-latex-render\")]);";

      document.body.appendChild(scriptConfig);
      document.body.appendChild(script);
      document.body.appendChild(scriptRun);
    } else {
      _window.$latexRender();
    }
  }

  private renderAbc() {
    if(document.querySelectorAll('pre .lang-abc').length!==0) {
      const _window: any = window;

      if (_window.$abcRender === undefined) {
        let abcjsCdn = document.createElement('script');
        abcjsCdn.type = "text/javascript";
        abcjsCdn.src = "https://cdn.jsdelivr.net/npm/vditor@3.1.10/dist/js/abcjs/abcjs_basic.min.js";

        let abcRun = document.createElement('script');
        abcRun.type = "text/javascript";
        abcRun.innerHTML = "window.$abcRender = () => {\n" +
          "      let abc_arr = document.querySelectorAll('pre .lang-abc');\n" +
          "      for (let i = 0; i < abc_arr.length; i++) {\n" +
          "        abc_arr[i].id = `abc-${i}`;\n" +
          "        window.ABCJS.renderAbc(`abc-${i}`, abc_arr[i].innerHTML);\n" +
          "      }\n" +
          "    }";

        document.body.appendChild(abcjsCdn);
        document.body.appendChild(abcRun);
      } else {
        _window.$abcRender();
      }
    }
  }

  private getImgSrc() {
    let regex = /!\[[\s\S]*?\]\(([\s\S]*?)\)/;
    let result = regex.exec(this.props.data.data===undefined?"":this.props.data.data.content);
    return result===null?"":result[1];
  }

  componentDidMount() {
    // render Latex
    this.renderLatex();

    // code highlight
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });

    // render Music Notation
    this.renderAbc();
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.codeToLatexSpan);
  }

  public render() {
    const htmlStr: string = this.props.data.data===undefined?"":this.props.data.data.content;

    const articleInfo = {
      url: `${BlogConfig.baseURL}/Article?id=${this.props.id}`,
      title: (this.props.data.data && this.props.data.data.title) || "",
      summary: ArticleList.stringFilter(htmlStr, false).replace(/\r*\n/g, ""),
      img: this.getImgSrc()
    };

    return (
      <div className={"article"}>
        <Head>
          <title>{articleInfo.title+' - DeAnti Blog'}</title>
        </Head>
        {
          +this.props.id !== 0 &&
            (<>
              <ArticleBar
                normal={ArticleBarOption.normal}
                share={ArticleBarOption.share}
                className={"-function-bar"}
              />
              <SponsorModal/>
            </>)
        }
        {reactHtmlReplace(htmlStr, replaceTags)}
      </div>
    );
  }
}