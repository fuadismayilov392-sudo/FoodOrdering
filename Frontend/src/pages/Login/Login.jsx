import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import styles from './Login.module.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'E-poçt və ya şifrə yanlışdır.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.loginPage}>
      <section className={styles.intro} aria-label="Foodie haqqında">
        <Link to="/" className={styles.brand}>Foodie<span>.</span></Link>
        <div className={styles.introContent}>
          <p className={styles.eyebrow}>Yemək vaxtı daha rahatdır</p>
          <h1>Dadlı seçimlərə yenidən qayıdın.</h1>
          <p>Sevimli restoranlarınızı, səbətinizi və sifarişlərinizi bir yerdən idarə edin.</p>
        </div>
        <div className={styles.features}>
          <span>✓ Sürətli sifariş</span><span>✓ Seçilmiş restoranlar</span><span>✓ Rahat çatdırılma</span>
        </div>
      </section>
      <section className={styles.formSection}>
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.heading}>
            <p>YENİDƏN XOŞ GƏLMİSİNİZ</p><h2>Daxil olun</h2><span>Hesabınıza daxil olaraq davam edin.</span>
          </div>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <label htmlFor="email">E-poçt ünvanı</label>
          <input id="email" type="email" placeholder="email@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <label htmlFor="password">Şifrə</label>
          <input id="password" type="password" placeholder="Şifrənizi daxil edin" value={password} onChange={(event) => setPassword(event.target.value)} required />
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Daxil olunur...' : 'Daxil ol'}</button>
          <p className={styles.loginPrompt}>Hesabınız yoxdur? <Link to="/register">Qeydiyyatdan keçin</Link></p>
        </form>
      </section>
    </main>
  );
}

export default Login;
