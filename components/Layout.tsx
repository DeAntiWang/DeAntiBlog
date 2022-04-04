import React, { ReactNode } from 'react';
import Head from 'next/head';
import MenuBar from 'components/MenuBar';
import Footer from 'components/Footer';
import styles from 'styles/Layout.module.scss';

type Props = {
  children?: ReactNode
  title?: string
  isHomePage?: boolean
}

const Layout = ({ children, title = '', isHomePage = false }: Props) => (
  <div className={styles.root}>
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8"/>
      <link rel="icon" href="/favicon.ico"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
    </Head>
    <MenuBar fullscreen={isHomePage}/>
    <div className={styles.rightContent}>{children}</div>
    <Footer fullscreen={isHomePage}/>
  </div>
);

export default Layout;
