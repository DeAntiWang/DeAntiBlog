import { CssBaseline } from '@geist-ui/react';
import { AppInitialProps } from 'next/app';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { MathJaxConfig, baiduSEO, zhanzhangStatistics, titleGame } from '../configs/inline-script';

export default class MyDocument extends Document<AppInitialProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = CssBaseline.flush();

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8"/>
          <link rel="icon" href="../static/favicon.ico"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
          <script type={"text/javascript"} dangerouslySetInnerHTML={{__html: baiduSEO()}}/>
          <script type={"text/javascript"} dangerouslySetInnerHTML={{__html: zhanzhangStatistics()}}/>
          <script type={"text/javascript"} dangerouslySetInnerHTML={{__html: titleGame()}}/>
          <script type={"text/x-mathjax-config"} dangerouslySetInnerHTML={{ __html: MathJaxConfig() }}></script>
          <script type={"text/javascript"} src="/static/lib/MathJax/MathJax.js"></script>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}