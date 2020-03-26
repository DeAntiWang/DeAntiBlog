import * as React from 'react';
import "./page404.scss";

export default class Page404 extends React.Component {
  public render() {
    return (
      <div id={"page-404"}>
        <div id={"content"}>
          <h1>404</h1>
          <p>Pages not found. Please check the URL you input</p>
        </div>
      </div>
    );
  }
}