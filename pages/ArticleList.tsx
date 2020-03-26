import * as React from 'react';
import MenuBar from '../components/MenuBar';


export default class ArticleList extends React.Component {
  public render() {
    return (
      <div id={"article-list-page"}>
        <MenuBar type={"left-side"} />
        <div id={"right-content"}>
          ArticleList
        </div>
      </div>
    );
  }
}