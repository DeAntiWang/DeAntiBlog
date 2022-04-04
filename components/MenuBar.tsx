import Link from 'next/link';
import { Avatar } from '@geist-ui/react'
import { BlogConfig } from 'configs/options';
import styles from 'styles/MenuBar.module.scss';

type Props = {
  fullscreen: boolean;
};

const MenuBar = ({ fullscreen }: Props) => (
  <div className={fullscreen ? styles.fullscreenBar : styles.sideBar}>
    <div className={fullscreen ? styles.fullscreenContent : styles.content}>
      <Avatar
        className={fullscreen ? styles.fullscreenAvatar : styles.avatar}
        src={BlogConfig.avatar}
        alt="头像"
      />
      <div className={fullscreen ? styles.fullscreenTitle : styles.title}>
        {BlogConfig.title}
      </div>
      <div className={fullscreen ? styles.fullscreenDesc : styles.desc}>{BlogConfig.desc}</div>
      <nav className={fullscreen ? styles.fullscreenNavBar : styles.navBar}>
        {
          BlogConfig.menu.map((val: any, index: number) => {
            if (val?.outside) {
              return (
                <a className={styles.navItem} href={val.router.pathname} key={val.title + index}>
                  {val.title}
                </a>
              );
            }
            return (
              <Link href={val.router} key={val.title + index}>
                <a className={styles.navItem}>{val.title}</a>
              </Link>
            );
          })
        }
      </nav>
    </div>
  </div>
);

export default MenuBar;
