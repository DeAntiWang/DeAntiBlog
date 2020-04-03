import * as React from 'react';
import Router from 'next/router';
import fetch from '../common/fetch';
// import Component
import { Modal, Tabs, Image } from '@zeit-ui/react';
import ArticleList from './ArticleList';
import FunctionBar from '../components/FunctionBar';
// import Md2jsx lib
import Markdown from 'markdown-to-jsx';
import { md2jsxOptions } from '../config/options';
// import Css and Svg
import { coin, qq, qqzone, weibo } from '../static/svgs';
import '../static/styles/Article.scss';

export default class Article extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalOpen: false
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
    return { data: data, id: query.id };
  }

  private static renderLatex() {
    const _window: any = window;
    if(_window.$latexRender === undefined) {
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
      script.innerHTML = "window.$latexRender = () => MathJax.Hub.Queue([\"Typeset\", MathJax.Hub, document.getElementById(\"need-latex-render\")]);";

      document.body.appendChild(scriptConfig);
      document.body.appendChild(script);
      document.body.appendChild(scriptRun);
    }else{
      _window.$latexRender();
    }
  }

  private getImgSrc() {
    let regex = /!\[[\s\S]*?\]\(([\s\S]*?)\)/;
    let result = regex.exec(this.props.data.data.content);
    return result===null?"":result[1];
  }

  private htmlEncode(html: string) {
    //1.首先动态创建一个容器标签元素，如DIV
    let temp = document.createElement ("div");
    //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
    (temp.textContent != undefined ) ? (temp.textContent = html) : (temp.innerText = html);
    //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
    let output = temp.innerHTML;
    temp = null;
    return output;
  };

  componentDidMount() {
    Article.renderLatex();
  }

  public render() {
    const mdText: string = this.props.data.data===undefined?"":this.props.data.data.content;

    const URL = `http://blog.darkkrix.xin/Article?id=${this.props.id}`,
          TITLE = this.props.data.data.title,
          SUMMARY = ArticleList.stringFilter(this.props.data.data.content, false).replace(/\r*\n/g, ""),
          IMG = this.getImgSrc();

    const functionBarOption = {
      normal: [
        {
          icon: coin,
          onClick: () => {
            this.setState({
              modalOpen: true
            })
          }
        }
      ],
      share: [
        {
          icon: qq,
          onClick: () => {
            const url = this.htmlEncode(URL),
                  title = this.htmlEncode(TITLE),
                  summary = this.htmlEncode(SUMMARY),
                  img = this.htmlEncode(IMG);

            let str = `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&summary=${summary}&pics=${img}`;
            window.open(str);
          }
        },
        {
          icon: qqzone,
          onClick: () => {
            const url = this.htmlEncode(URL),
              title = this.htmlEncode(TITLE),
              summary = this.htmlEncode(SUMMARY),
              img = this.htmlEncode(IMG);

            let str = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&desc=${summary}&summary=${summary}&pics=${img}`;
            window.open(str)
          }
        },
        {
          icon: weibo,
          onClick: () => {
            const url = this.htmlEncode(URL),
              desc = this.htmlEncode(SUMMARY),
              img = this.htmlEncode(IMG);

            let str = `http://service.weibo.com/share/mobile.php?url=${url}&title=${desc}&pic=${img}`;
            window.open(str);
          }
        }
      ]
    };

    return (
      <div className={"article"}>
        {
          parseInt(this.props.id)===0?<></>:
            (<>
              <FunctionBar
                list={functionBarOption}
                className={"-function-bar"}
              />
              <Modal
                open={this.state.modalOpen}
                onClose={() => {this.setState({modalOpen: false})}}
              >
                <Modal.Title>Sponsor</Modal.Title>
                <Modal.Subtitle>Thanks for your giving</Modal.Subtitle>
                <Modal.Content>
                  <Tabs initialValue="1">
                    <Tabs.Item label="支付宝" value="1">
                      <Image width={350} height={350} src="/static/img/alipay.jpg" />
                    </Tabs.Item>
                    <Tabs.Item label="微信" value="2">
                      <Image width={350} height={350} src="/static/img/wechat.jpg" />
                    </Tabs.Item>
                  </Tabs>
                </Modal.Content>
              </Modal>
            </>)
        }
        <Markdown options={md2jsxOptions} id={"need-latex-render"}>
          {mdText}
        </Markdown>
      </div>
    );
  }
}