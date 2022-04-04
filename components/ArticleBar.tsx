import { CSSProperties } from "react";
import styles from 'styles/ArticleBar.module.scss';

interface ArticleInfo {
  url: string;
  title: string;
  summary: string;
  img: string;
}

interface BarItemOption {
  id: string;
  icon: string;
  onClick: () => void;
  type: 'normal' | 'share';
};

type Prop = {
  info: ArticleInfo;
  className?: string;
  style?: CSSProperties;
};

const BarElement = ({ id, icon, onClick }: Omit<BarItemOption, 'type'>): JSX.Element => (
  <div className={`function-icon ${icon}`} key={`icon-element-${id}`} onClick={onClick}></div>
);

const BarItem: Omit<BarItemOption, 'onClick'>[] = [{
  id: 'sponsor',
  icon: styles.coinIcon,
  type: 'normal',
}, {
  id: 'qq',
  icon: styles.qqIcon,
  type: 'share',
}, {
  id: 'qqzone',
  icon: styles.qqzoneIcon,
  type: 'share',
}, {
  id: 'weibo',
  icon: styles.weiboIcon,
  type: 'share',
}];

const ArticleBar = ({ info, className, style }: Prop) => {
  const normal = BarItem.filter(x => x.type === 'normal');
  const share = BarItem.filter(x => x.type === 'share');

  const onClick = (id: string) => {
    switch (id) {
      case 'sponsor':
      case 'qq':
      case 'qqzone':
      case 'weibo':
    }
  };
  
  return (
    <div id={"function-bar-container"} className={className} style={style}>
      {
        normal?.length && (
          <div id={"normal-function-list"}>
            {
              normal.map(({ id, icon }) => (
                <BarElement id={id} icon={icon} onClick={() => onClick(id)} />
              ))
            }
          </div>
        )
      }
      {
        share?.length && (
          <div id={"share-function-list"}>
            <span>分享</span>
            {
              share.map(({ id, icon }) => (
                <BarElement id={id} icon={icon} onClick={() => onClick(id)} />
              ))
            }
          </div>
        )
      }
    </div>
  );
};

export default ArticleBar;
