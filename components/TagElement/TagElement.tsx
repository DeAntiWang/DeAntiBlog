import { Collapse } from '@geist-ui/react';
import SubListElement from './SubListElement/SubListElement';

interface Prop {
  title: string,
  list: Array<any>
}

export default function TagElement(props: Prop) {
  return (
    <Collapse
      title={props.title}
      className={"tag-element"}
      key={ "tag-" + props.title }
    >
      <ul className={"tag-sub-list"}>
        {
          props.list.map(SubListElement)
        }
      </ul>
    </Collapse>
  )
}