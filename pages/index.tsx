import * as React from 'react';
import MenuBar from '../components/MenuBar';

export default class Index extends React.Component<any, Object> {
  public render() {
    return (
      <MenuBar type={"whole-screen"} />
    );
  }
}