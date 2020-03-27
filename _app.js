import App, { Container } from 'next/app';
import { Head } from 'next/document';
import './styles/index.scss';

export default class myApp extends App {
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
      <Container>
        <Head>
          <title>DeAnti- Blog</title>
        </Head>
        <Component {...pageProps} />
      </Container>
    )
  }
}