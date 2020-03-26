import * as React from 'react';
import { Link } from 'react-router-dom';
import './MenuBar.scss';

export default class App extends React.Component<{}, Object> {
  public readonly state = {

  };

  public render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/article">Article</Link>
        <Link to="/about">About</Link>
      </div>
    );
  }
}