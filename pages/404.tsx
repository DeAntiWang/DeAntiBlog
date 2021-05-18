import Head from 'next/head';
import "styles/Page404.scss";

export default function Page404() {
  return (
    <div id={"content404"}>
      <Head>
        <title>Error - DeAnti Blog</title>
      </Head>
      <div id={"page404"}>
        <h1>404</h1>
        <p>Pages not found. Please check the URL you input</p>
      </div>
    </div>
  )
};