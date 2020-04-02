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
        <script src={"../common/analyse.js"} type={"text/javascript"}/>
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