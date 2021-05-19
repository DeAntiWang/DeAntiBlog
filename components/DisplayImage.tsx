import { Display } from '@geist-ui/react';

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