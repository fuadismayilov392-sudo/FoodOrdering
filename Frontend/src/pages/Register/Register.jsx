import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext.jsx';
import styles from './Register.module.scss';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.registerPage}>
      <section className={styles.intro} aria-label="Foodie haqqında">
        <Link to="/" className={styles.brand}>Foodie<span>.</span></Link>
        <div className={styles.introContent}>
          <p className={styles.eyebrow}>Dadlı seçimlər, bir toxunuşda</p>
          <h1>Sevdiyiniz yeməklər sizə daha yaxın.</h1>
          <p>Qeydiyyatdan keçin, restoranları kəşf edin və sifarişlərinizi asanlıqla idarə edin.</p>
        </div>
        <div className={styles.features}>
          <span>✓ Sürətli sifariş</span><span>✓ Seçilmiş restoranlar</span><span>✓ Rahat çatdırılma</span>
        </div>
      </section>
      <section className={styles.formSection}>
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <div className={styles.heading}>
            <p>FOODIE-YƏ XOŞ GƏLMİSİNİZ</p><h2>Hesab yaradın</h2><span>Bir neçə saniyəyə başlayın.</span>
          </div>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <label htmlFor="name">Adınız</label>
          <input id="name" type="text" placeholder="Adınızı daxil edin" value={name} onChange={(event) => setName(event.target.value)} required />
          <label htmlFor="email">E-poçt ünvanı</label>
          <input id="email" type="email" placeholder="email@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <label htmlFor="password">Şifrə</label>
          <input id="password" type="password" placeholder="Ən azı 6 simvol" value={password} onChange={(event) => setPassword(event.target.value)} minLength="6" required />
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Qeydiyyat aparılır...' : 'Qeydiyyatdan keç'}</button>
          <p className={styles.loginPrompt}>Artıq hesabınız var? <Link to="/login">Daxil olun</Link></p>
        </form>
      </section>
    </main>
  );
}

export default Register;
