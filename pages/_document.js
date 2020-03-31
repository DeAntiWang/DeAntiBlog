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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
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