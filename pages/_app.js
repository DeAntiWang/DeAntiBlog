import * as React from 'react';
import App from 'next/app';
import Head from 'next/head';
// import Pages
import Index from './index';
// import Components
import MenuBar from '../components/MenuBar';
import BackTop from '../components/BackTop';
import Footer from '../components/Footer';
// import Css
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
    const screenType = (Component.constructor.name+Component.name).indexOf('Index')===-1?"left-side":"whole-screen";

    return (
      <React.Fragment>
        <Head>
          <title>DeAnti Blog</title>
        </Head>
        <div id={"root"}>
          <MenuBar type={screenType}/>
          <div id={"right-content"}>
            <Component {...pageProps} />
          </div>
        </div>
        <BackTop listen={'right-content'} />
        <Footer type={screenType}/>
      </React.Fragment>
    )
  }
}