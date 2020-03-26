import * as React from 'react';
import MenuBar from '../components/MenuBar';


export default class Article extends React.Component {
  public render() {
    return (
      <div id={"article-page"}>
        <MenuBar type={"left-side"} />
        <div id={"right-content"}>
          Artivle
        </div>
      </div>
    );
  }
}