import { Button } from '@geist-ui/react';

type Prop = {
  title: string,
  href: string
};

const Blogroll = ({ title, href }: Prop) => {
  const onLink = () => window.open(href);
  return <Button onClick={onLink} type="secondary" ghost>{title}</Button>;
};

export default Blogroll;
