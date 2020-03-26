import * as React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import '../common/css/index.scss';
// import Components
import MenuBar from '../components/MenuBar/MenuBar';
// import Pages
import Article from "../pages/Article/Article";
import ArticleList from "../pages/ArticleList/ArticleList";
import Page404 from "../pages/Page404/Page404";

export default class Router extends React.Component<{}, {}> {
  public render() {
    return (
      <HashRouter>
        <Route component={MenuBar}/>
        <div className={"right-content"}>
          <Switch>
            <Route path="/" exact/>
            <Route path="/article" exact component={ArticleList} />
            <Redirect path="/article/0" exact to="/about" />
            <Route path="/article/:id" exact component={Article} />
            <Route path="/about" exact component={Article} />
            <Route component={Page404} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}