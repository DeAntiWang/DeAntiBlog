import Layout from 'components/Layout';
import styles from 'styles/404.module.scss';

const Page404 = () => (
  <Layout title={'Error - DeAnti Blog'}>
    <div className={styles.content404}>
      <div className={styles.page404}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.desc}>
          Pages not found or cause error. Please check the URL you input
        </p>
      </div>
    </div>
  </Layout>
);

export default Page404;
