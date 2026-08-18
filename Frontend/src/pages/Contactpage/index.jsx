import { useState } from 'react';
import Navbar from '../../layouts/header';
import styles from './index.module.scss';

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setIsSent(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form göndərildi:', formData);
    setIsSent(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <section className={styles.hero}>
          <p>ƏLAQƏ</p>
          <h1>Sizin fikriniz bizim üçün önəmlidir.</h1>
          <span>Sualınız, təklifiniz və ya sifarişinizlə bağlı dəstəyə ehtiyacınız varsa, bizə yazın.</span>
        </section>
        <section className={styles.content}>
          <aside className={styles.infoCard}>
            <h2>Bizimlə əlaqə saxlayın</h2>
            <p>Komandamız sizə ən qısa zamanda cavab verəcək.</p>
            <div className={styles.infoList}>
              <div><span aria-hidden="true">✉</span><p><b>E-poçt</b>info@foodie.az</p></div>
              <div><span aria-hidden="true">☎</span><p><b>Telefon</b>+994 50 123 45 67</p></div>
              <div><span aria-hidden="true">⌖</span><p><b>Ünvan</b>Bakı, Azərbaycan</p></div>
            </div>
          </aside>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Mesaj göndərin</h2>
            <label htmlFor="name">Adınız</label>
            <input id="name" name="name" type="text" placeholder="Adınızı daxil edin" value={formData.name} onChange={handleChange} required />
            <label htmlFor="email">E-poçt ünvanı</label>
            <input id="email" name="email" type="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} required />
            <label htmlFor="message">Mesajınız</label>
            <textarea id="message" name="message" placeholder="Sizə necə kömək edə bilərik?" value={formData.message} onChange={handleChange} required />
            <button type="submit">Mesajı göndər <span aria-hidden="true">→</span></button>
            {isSent && <p className={styles.success} role="status">Mesajınız qəbul edildi. Təşəkkür edirik!</p>}
          </form>
        </section>
      </main>
    </>
  );
}

export default ContactPage;
