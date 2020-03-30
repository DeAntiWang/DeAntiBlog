import * as React from 'react';
import Router from 'next/router';
import fetch from '../common/fetch';
// import Components
import MenuBar from '../components/MenuBar';
// import Md2jsx lib
import Markdown from 'markdown-to-jsx';
import { md2jsxOptions } from '../config/options';
// import Css
import '../styles/Article.scss';

export default class Article extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
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
      if(res === undefined) {
        Router.push('/404');
      }else{
        res.writeHead(301, {
          Location: '404'
        });
        res.end();
      }
    }
    return { data };
  }

  private static renderLatex() {
    const scriptConfig = document.createElement('script');
    scriptConfig.type = "text/x-mathjax-config";
    scriptConfig.innerHTML = "MathJax.Hub.Config({\n" +
      "      showProcessingMessages: false, //关闭js加载过程信息\n" +
      "      messageStyle: \"none\", //不显示信息\n" +
      "      jax: [\"input/TeX\", \"output/HTML-CSS\"],\n" +
      "      tex2jax: {\n" +
      "        inlineMath: [[\"$\", \"$\"], [\"\\\\(\", \"\\\\)\"]], //行内公式选择符\n" +
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
    script.innerHTML = "MathJax.Hub.Queue([\"Typeset\", MathJax.Hub, document.getElementById(\"need-latex-render\")]);";

    document.body.appendChild(scriptConfig);
    document.body.appendChild(script);
    document.body.appendChild(scriptRun);
  }

  componentDidMount() {
    Article.renderLatex();
  }

  public render() {
    const mdText: string = this.props.data.data===undefined?"":this.props.data.data.content;

    return (
      <div id={"article-page"}>
        <MenuBar type={"left-side"} />
        <div id={"right-content"}>
          <div id={"content"}>
            <Markdown options={md2jsxOptions} id={"need-latex-render"}>
              {mdText}
            </Markdown>
          </div>
        </div>
      </div>
    );
  }
}