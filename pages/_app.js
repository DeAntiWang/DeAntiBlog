import * as React from 'react';
import App from 'next/app';
import Router from 'next/router';
// import Components
import MenuBar from '../components/MenuBar';
import BackTop from '../components/BackTop';
import Footer from '../components/Footer';
// import Css
import '../static/blank.css'

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    Router.events.on('routeChangeComplete', () => {
      if (process.env.NODE_ENV !== 'production') {
        const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]');
        const timestamp = new Date().valueOf();
        els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp;
      }
    });

    return {pageProps}
  }

  checkType(str) {
    return !(str==="/index" || str==="" || str==="/");
  }



  render () {
    const {Component, pageProps} = this.props;
    let screenType = "left-side";
    if(this.checkType(this.props.router.pathname.toLowerCase())){
      screenType = "left-side"
    }else{
      screenType = "whole-screen";
    }

    return (
      <React.Fragment>
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