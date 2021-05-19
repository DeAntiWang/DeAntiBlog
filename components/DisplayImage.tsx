import { Display } from '@geist-ui/react';
// import Image from 'next/image';

export default function DisplayImage(props: any) {
  const leftProps = Object.assign({}, props, {
    alt: undefined,
    className: undefined
  });

  return (
    <Display shadow caption={props.alt} className={props.className}>
      <img {...leftProps} />
    </Display>
  );
}