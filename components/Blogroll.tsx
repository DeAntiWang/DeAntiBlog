import { Button } from '@geist-ui/react';

interface Prop {
  title: string,
  href: string
}

export default function Blogroll(props: Prop) {
  const onLink = () => {
    window.open(props.href);
  };

  return (
    <Button onClick={onLink} type="secondary" ghost>{props.title}</Button>
  )
}