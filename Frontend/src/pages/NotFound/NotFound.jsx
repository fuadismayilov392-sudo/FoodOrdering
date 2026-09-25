import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="not-found-title">
        <p className={styles.code}>404</p>
        <h1 id="not-found-title">Səhifə tapılmadı</h1>
        <p>Keçid düzgün deyil və ya bu səhifə artıq mövcud deyil.</p>
        <Link to="/" className={styles.homeLink}>Ana səhifəyə qayıt</Link>
      </section>
    </main>
  );
}

export default NotFound;
