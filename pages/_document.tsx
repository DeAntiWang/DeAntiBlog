import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import { baiduSEO, zhanzhangStatistics, titleGame } from 'config/inline-script';

export default class MyDocument extends Document {
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
      )
    }
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
        </Head>
        <body>
          <GeistProvider>
            <CssBaseline/>
            <Main/>
            <NextScript/>
          </GeistProvider>
        </body>
      </Html>
    );
  }
}