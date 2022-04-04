import Link from 'next/link';
import { Collapse } from '@geist-ui/react';
import styles from 'styles/TagElement.module.scss';
import type { Article } from 'types/Article';

type Props = {
  title: string;
  list: Article[];
};

const TagElement = ({ list, title }: Props): JSX.Element => (
  <Collapse className={styles.tagElement} title={title}>
    <ul className={"tag-sub-list"}>
      { 
        (list || []).map((val, index) => (
          <li key={`tag-li_${index}`}>
            <Link href={`/article/${val.id}`} key={`${val.title}${val.id}`}>
              <div className={styles.tagContent}>
                <div className={styles.tagTitle}>{val.title}</div>
              </div>
            </Link>
          </li>
        ))
      }
    </ul>
  </Collapse>
);

export default TagElement;
