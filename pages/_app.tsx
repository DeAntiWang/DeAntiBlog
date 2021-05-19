import { useState, useEffect } from "react";
import { AppProps, NextWebVitalsMetric } from 'next/app';
import { GeistProvider, CssBaseline } from '@geist-ui/react';
// import Components
import MenuBar from '../components/MenuBar';
import BackTop from '../components/BackTop';
import Footer from '../components/Footer';
// import Css
import '../styles/index.scss';

const checkType = (str: string) => {
  return !(str==="/index" || str==="" || str==="/");
}

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  
  let screenType: "left-side" | "whole-screen" = "left-side";
  if(checkType(props.router.pathname.toLowerCase())){
    screenType = "left-side"
  }else{
    screenType = "whole-screen";
  }

  const [themeType, setThemeType] = useState('light')

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      console.log('🎉 Dark mode is opened!');
      setThemeType('dark');
    }
  }, []);

  return (
    <>
      <GeistProvider themeType={themeType}>
        <CssBaseline/>
        <div id={"root"}>
          <MenuBar type={screenType}/>
          <div id={"right-content"}>
            <Component {...pageProps} />
          </div>
        </div>
        <BackTop listen={'right-content'} />
        <Footer type={screenType}/>
      </GeistProvider>
    </>
  )
}

// MyApp.getInitialProps = async ({ Component, router, ctx }) => {
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx)
//   }
//   Router.events.on('routeChangeComplete', () => {
//     if (process.env.NODE_ENV !== 'production') {
//       const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]');
//       const timestamp = new Date().valueOf();
//       els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp;
//     }
//   });
//   return {pageProps}
// }