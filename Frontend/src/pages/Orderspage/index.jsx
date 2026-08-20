import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../layouts/header';
import Footer from '../../layouts/footer';
import styles from './index.module.scss';

function Orderpage() {
  const { state } = useLocation();
  const food = state?.food;
  const [isOrdered, setIsOrdered] = useState(false);
  const price = Number(food?.Price ?? food?.price ?? 0);

  if (!food) return <><Navbar /><main className={styles.empty}><span>🍽️</span><h1>Sifariş üçün yemək seçin</h1><p>Menudan bəyəndiyiniz yeməyin üzərinə klikləyin.</p><Link to="/menu">Menulara bax</Link></main><Footer /></>;

  return <><Navbar /><main className={styles.page}>
    <Link to={-1} className={styles.back}>← Geri qayıt</Link>
    <div className={styles.heading}><p>SİFARİŞİNİZ</p><h1>Sifarişi tamamlayın</h1><span>Çatdırılma məlumatlarınızı daxil edin.</span></div>
    <div className={styles.orderLayout}>
      <section className={styles.formCard}><h2>Çatdırılma məlumatları</h2><form onSubmit={(event) => { event.preventDefault(); setIsOrdered(true); }}>
        <label htmlFor="fullName">Ad və soyad</label><input id="fullName" placeholder="Adınızı daxil edin" required />
        <label htmlFor="phone">Telefon nömrəsi</label><input id="phone" type="tel" placeholder="+994 50 000 00 00" required />
        <label htmlFor="address">Çatdırılma ünvanı</label><textarea id="address" placeholder="Küçə, bina və mənzil nömrəsi" required />
        <label htmlFor="payment">Ödəniş üsulu</label><select id="payment" defaultValue="cash"><option value="cash">Nağd ödəniş</option><option value="card">Kartla ödəniş</option></select>
        <button type="submit">Sifarişi təsdiqlə <span>→</span></button>{isOrdered && <p className={styles.success}>Sifarişiniz qəbul edildi. Tezliklə sizinlə əlaqə saxlayacağıq.</p>}
      </form></section>
      <aside className={styles.summary}><p>SİFARİŞ XÜLASƏSİ</p><div className={styles.food}><img src={food.imageUrl || 'https://via.placeholder.com/100'} alt={food.FoodName} /><div><h2>{food.FoodName}</h2><span>{food.category || 'Yemək'}</span></div></div><div className={styles.line}><span>Yeməyin qiyməti</span><b>{price.toFixed(2)} AZN</b></div><div className={styles.line}><span>Çatdırılma</span><b>Pulsuz</b></div><div className={styles.total}><span>Cəmi</span><b>{price.toFixed(2)} AZN</b></div></aside>
    </div>
  </main><Footer /></>;
}

export default Orderpage;
