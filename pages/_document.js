import Document, { Html, Head, Main, NextScript } from 'next/document'
import { CSSBaseline } from '@zeit-ui/react'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = CSSBaseline.flush();

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
        </>
      )
    }
  }

  render() {
    return (
      <Html>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="../static/favicon.ico" />
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.3/css/unicons.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <script type={"text/javascript"} dangerouslySetInnerHTML={{__html: "var _hmt = _hmt || [];\n" +
        "(function() {\n" +
        "  var hm = document.createElement(\"script\");\n" +
        "  hm.src = \"https://hm.baidu.com/hm.js?d790d9f864c6f0f4152f1186bb72c282\";\n" +
        "  var s = document.getElementsByTagName(\"script\")[0];\n" +
        "  s.parentNode.insertBefore(hm, s);\n" +
        "})();"}}/>
        <script type={"text/javascript"} dangerouslySetInnerHTML={{__html: "(function(){\n" +
          "          var bp = document.createElement('script');\n" +
          "          var curProtocol = window.location.protocol.split(':')[0];\n" +
          "          if (curProtocol === 'https') {\n" +
          "          bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';\n" +
          "        }\n" +
          "          else {\n" +
          "          bp.src = 'http://push.zhanzhang.baidu.com/push.js';\n" +
          "        }\n" +
          "          var s = document.getElementsByTagName(\"script\")[0];\n" +
          "          s.parentNode.insertBefore(bp, s);\n" +
          "        })();"}}/>
        <script type={"text/javascript"} dangerouslySetInnerHTML={{__html: "(function() {\n" +
          "    let OriginTitile = document.title;\n" +
          "    let titleTime, leaveTime, flag=false;\n" +
          "    document.addEventListener('visibilitychange', function() {\n" +
          "        if (document.hidden) {\n" +
          "            clearTimeout(leaveTime);\n" +
          "            leaveTime = setTimeout(() => {\n" +
          "                document.title = '_( ﾟДﾟ)ﾉ 页面崩溃了??';\n" +
          "                flag=true;\n" +
          "                clearTimeout(titleTime);\n" +
          "            }, 10000);\n" +
          "        } else {\n" +
          "            clearTimeout(leaveTime);\n" +
          "            if(flag) {\n" +
          "                document.title = '(つェ⊂)咦!又好了!';\n" +
          "                flag = false;\n" +
          "            }\n" +
          "            titleTime = setTimeout(function() {\n" +
          "                document.title = OriginTitile;\n" +
          "            },1000);\n" +
          "        }\n" +
          "    });\n" +
          "})();"}}/>
      </Head>
      <body>
        <CSSBaseline/>
        <Main />
        <NextScript />
      </body>
      </Html>
    );
  }
}