import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import styles from '../NotFound/NotFound.module.scss';

function RouteError() {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  const title = isNotFound ? 'Səhifə tapılmadı' : 'Nəsə xəta baş verdi';
  const message = isNotFound
    ? 'Axtardığınız səhifə mövcud deyil.'
    : 'Zəhmət olmasa bir qədər sonra yenidən cəhd edin.';

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="route-error-title">
        <p className={styles.code}>{isNotFound ? '404' : '!'}</p>
        <h1 id="route-error-title">{title}</h1>
        <p>{message}</p>
        <Link to="/" className={styles.homeLink}>Ana səhifəyə qayıt</Link>
      </section>
    </main>
  );
}

export default RouteError;
