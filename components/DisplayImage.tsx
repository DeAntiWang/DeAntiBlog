import { Display } from '@geist-ui/react';
import Image from 'next/image';

type Props = {
  src: string;
  alt?: string;
  className?: string;
  [key: string]: string | number;
}

const DisplayImage = (props: Props) => {
  const leftProps = { ...props };
  delete leftProps.alt;
  delete leftProps.className;

  return (
    <Display shadow caption={props.alt} className={props.className}>
      <Image {...leftProps} />
    </Display>
  );
};

export default DisplayImage;
