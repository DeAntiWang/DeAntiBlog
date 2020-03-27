import * as React from 'react';
import { Display } from '@zeit-ui/react';

export default class DisplayImage extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    let leftProps = {...this.props};
    delete leftProps.alt;
    delete leftProps.src;
    delete leftProps.className;

    return (
      <Display shadow caption={this.props.alt} className={this.props.className}>
        <img src={this.props.src} {...leftProps} />
      </Display>
    );
  }
};