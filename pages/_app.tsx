import React from 'react';
import { useState, useEffect } from "react";
import { GeistProvider, CssBaseline } from '@geist-ui/react';
import type { AppProps } from 'next/app';
import 'styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [themeType, setThemeType] = useState('light');

  useEffect(() => {
    if (window.matchMedia?.('(prefers-color-scheme: dark)')?.matches) {
      console.log('🎉 Dark mode is opened!');
      setThemeType('dark');
    }
  }, []);

  return (
    <React.StrictMode>
      <GeistProvider themeType={themeType}>
        <CssBaseline/>
        <Component {...pageProps}/>
      </GeistProvider>
    </React.StrictMode>
  );
};

export default MyApp;
