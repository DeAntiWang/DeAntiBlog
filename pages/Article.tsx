import * as React from 'react';
// import Components
import MenuBar from '../components/MenuBar';
// import Md2jsx lib
import Markdown from 'markdown-to-jsx';
import { md2jsxOptions } from '../config/options';
// import Css
import '../styles/Article.scss';

interface State {
  mdText: string
}

export default class Article extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      mdText: '# 记录一次React+TypeScript的开发历程\n' +
        '\n' +
        '> 之前一直使用Vue框架，这次打算学习一下React顺便学习一下TypeScript，于是就有了这个项目。在开发过程中遇到了一些问题，感觉这些坑或者说刚开始学不知道的要注意的点，是有必要记录下来的。\n' +
        '\n' +
        '## 建立一个React + TypeScript + Sass + Webpack的项目\n' +
        '\n' +
        '### 初始化项目\n' +
        '\n' +
        '首先我们用```$ yarn init```初始化一个项目，这样我们就在项目根目录得到一个```package.json```文件，这个文件是项目配置文件，我们需要对他进行一些改动, 向其json中加入如下代码：  \n' +
        '\n' +
        '```\n' +
        '"scripts": {\n' +
        '\t"dev": "npx webpack --config webpack.config.js"\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '上面的配置作用是：指定项目运行命令 $\\frac{2}{5}$  \n\n' +
        '公司   | 工作地点  | 内推联系人 |  实习类型 | 招聘日期  |  后文\n' +
        ':-----:|:--------:|:--------:|:--------:|:-------:|:------:\n' +
        ' yitu  | 上海      |  xxx   | 日常/暑期 |   xxx   | 缩招,不收技术\n' +
        ' 腾讯wxg| 广州     |  xxx    |  暑期    |    xxx  | 签了offer\n\n' +
        '![Image Title](https://assets.zeit.co/image/upload/q_auto/front/assets/design/white-triangle.png)\n\n' +
        '[Link Title](https://assets.zeit.co/image/upload/q_auto/front/assets/design/white-triangle.png)\n',
    };
  }

  private renderLatex() {
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
    this.renderLatex();
  }

  public render() {
    return (
      <div id={"article-page"}>
        <MenuBar type={"left-side"} />
        <div id={"right-content"}>
          <div id={"content"}>
            <Markdown options={md2jsxOptions} id={"need-latex-render"}>
              {this.state.mdText}
            </Markdown>
          </div>
        </div>
      </div>
    );
  }
}