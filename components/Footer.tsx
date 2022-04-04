import { BlogConfig } from 'configs/options';
import styles from 'styles/Footer.module.scss';

type Props = {
  fullscreen: boolean;
}

const Footer = ({ fullscreen }: Props) => {
  const nowYear = new Date().getFullYear();

  return (
    <footer className={fullscreen ? styles.fullscreenFooter : styles.footer}>
      <span className={styles.footerRow}>
        Copyright {nowYear} <span dangerouslySetInnerHTML={{__html: "&#169"}}/> Developed by DeAnti-
      </span>
      {
        BlogConfig.recordNumber !==null ?
          <span className={styles.recordCode}>{BlogConfig.recordNumber}</span>
          : <></>
      }
    </footer>
  );
};

export default Footer;