import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
// import Components
import MenuBar from '../components/MenuBar/MenuBar';
// import Pages
import Article from "../pages/Article/Article";
import About from "../pages/About/About";
import ArticleList from "../pages/ArticleList/ArticleList";
import Page404 from "../pages/Page404/Page404";

export default class Router extends React.Component<{}, {}> {
  public render() {
    return (
      <HashRouter>
        <MenuBar/>
        <Switch>
          <Route path="/" exact/>
          <Route path="/article" exact component={ArticleList} />
          <Route path="/article/:id" exact component={Article} />
          <Route path="/about" exact component={About} />
          <Route component={Page404} />
        </Switch>
      </HashRouter>
    );
  }
}