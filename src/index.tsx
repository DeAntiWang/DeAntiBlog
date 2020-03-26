import * as React from 'react';
import * as ReactDom from 'react-dom';
import Route from './router/index';

const render = (Component: any) => {
  ReactDom.render(
    <Component />,
    document.getElementById('root') as HTMLElement
  )
};

render(Route);