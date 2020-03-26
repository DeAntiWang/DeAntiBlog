import * as React from 'react';
// import * as ReactDom from 'react-dom';
// import Route from '../src/router/index';
import MenuBar from '../components/MenuBar';

export default class Index extends React.Component<any, Object> {
  public render() {
    return (
      <MenuBar type={"whole-screen"} />
    );
  }
}