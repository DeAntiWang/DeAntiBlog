import * as React from 'react';
import MenuBar from '../components/MenuBar';
import ArticleCard from '../components/ArticleCard';
import {ZEITUIProvider, CSSBaseline} from "@zeit-ui/react";
import '../styles/ArticleList.scss';


export default class ArticleList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      res: [1,2,3,4,5,6,7,8,9,0]
    }
  }

  public render() {
    return (
      <ZEITUIProvider>
        <CSSBaseline />
        <div id={"article-list-page"}>
          <MenuBar type={"left-side"} />
          <div id={"right-content"}>
            <div className={"list"}>
              {this.state.res.map((val: any) => <ArticleCard key={val} />)}
            </div>
          </div>
        </div>
      </ZEITUIProvider>
    );
  }
}