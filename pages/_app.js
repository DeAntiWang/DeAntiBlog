import * as React from 'react';
import App from 'next/app';
import Head from 'next/head';
import '../styles/index.scss';

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render () {
    const {Component, pageProps} = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>DeAnti- Blog</title>
        </Head>
        <Component {...pageProps} />
      </React.Fragment>
    )
  }
}