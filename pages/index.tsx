import * as React from 'react';
import Head from 'next/head';
import '../static/styles/index.scss';

export default class Index extends React.Component<any, Object> {
  public render() {
    return (
      <>
        <Head>
          <title>{'Home - DeAnti Blog'}</title>
        </Head>
      </>
    );
  }
}