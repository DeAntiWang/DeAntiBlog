import * as React from 'react';
import { Button } from '@zeit-ui/react';

interface Prop {
  title: string,
  href: string
}

export default class Blogroll extends React.Component<Prop, any> {
  public constructor(props: Prop) {
    super(props);
  }

  onLink() {
    window.open(this.props.href)
  }

  public render() {
    return (
      <Button onClick={this.onLink.bind(this)} type="secondary" ghost>{this.props.title}</Button>
    )
  }
}