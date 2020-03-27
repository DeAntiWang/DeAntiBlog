import * as React from 'react';
import MenuBar from '../components/MenuBar';
import "../styles/Page404.scss";

export default class Page404 extends React.Component {
  public render() {
    return (
      <div id={"page-404"}>
        <MenuBar type={"left-side"} />
        <div id={"right-content"}>
          <div id={"content"} style={{width: "100%", maxWidth: "100%"}}>
            <h1>404</h1>
            <p>Pages not found. Please check the URL you input</p>
          </div>
        </div>
      </div>
    );
  }
}