import { Display } from '@zeit-ui/react';

export default function DisplayImage(props: any) {
  const leftProps = Object.assign(props, {
    alt: undefined,
    src: undefined,
    className: undefined
  });

  return (
    <Display shadow caption={props.alt} className={props.className}>
      <img src={props.src} {...leftProps} />
    </Display>
  );
}