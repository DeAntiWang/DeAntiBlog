import * as React from 'react';

export default class Latex extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <code>
        {this.props.children}
      </code>
    );
  }
}