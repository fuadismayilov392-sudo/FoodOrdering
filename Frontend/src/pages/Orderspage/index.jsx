import { useMemo, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../layouts/header';
import Footer from '../../layouts/footer';
import styles from './index.module.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Orderpage() {
  const { state } = useLocation();
  const items = useMemo(() => state?.items || (state?.food ? [{ ...state.food, quantity: 1 }] : []), [state]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isOrdered, setIsOrdered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const total = items.reduce((sum, item) => sum + Number(item.Price ?? item.price ?? 0) * Number(item.quantity || 1), 0);

  async function submitOrder(event) {
    event.preventDefault();
    setError('');
    const form = new FormData(event.currentTarget);
    if (paymentMethod === 'cash') return setIsOrdered(true);
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/payments/checkout`, {
        items: items.map((item) => ({ productId: item._id, quantity: item.quantity || 1 })),
        customer: { fullName: form.get('fullName'), phone: form.get('phone'), email: form.get('email'), address: form.get('address') },
      });
      window.location.assign(data.paymentUrl);
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Ödənişi başlatmaq mümkün olmadı.');
      setIsLoading(false);
    }
  }

  if (!items.length) return <><Navbar /><main className={styles.empty}><span>🍽️</span><h1>Sifariş üçün yemək seçin</h1><p>Menyudan bəyəndiyiniz yeməyin üzərinə klikləyin.</p><Link to="/menu">Menulara bax</Link></main><Footer /></>;

  return <><Navbar /><main className={styles.page}>
    <Link to={-1} className={styles.back}>← Geri qayıt</Link>
    <div className={styles.heading}><p>SİFARİŞİNİZ</p><h1>Sifarişi tamamlayın</h1><span>Çatdırılma məlumatlarınızı daxil edin.</span></div>
    <div className={styles.orderLayout}>
      <section className={styles.formCard}><h2>Çatdırılma məlumatları</h2><form onSubmit={submitOrder}>
        <label htmlFor="fullName">Ad və soyad</label><input id="fullName" name="fullName" placeholder="Adınızı daxil edin" required />
        <label htmlFor="phone">Telefon nömrəsi</label><input id="phone" name="phone" type="tel" placeholder="+994 50 000 00 00" required />
        <label htmlFor="email">E-poçt</label><input id="email" name="email" type="email" placeholder="email@example.com" required />
        <label htmlFor="address">Çatdırılma ünvanı</label><textarea id="address" name="address" placeholder="Küçə, bina və mənzil nömrəsi" required />
        <label htmlFor="payment">Ödəniş üsulu</label><select id="payment" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}><option value="cash">Nağd ödəniş</option><option value="card">Kartla ödəniş</option></select>
        <button type="submit" disabled={isLoading}>{isLoading ? 'Ödəniş səhifəsi açılır…' : paymentMethod === 'card' ? 'Kartla ödənişə keç →' : 'Sifarişi təsdiqlə →'}</button>
        {error && <p className={styles.error}>{error}</p>}{isOrdered && <p className={styles.success}>Sifarişiniz qəbul edildi. Tezliklə sizinlə əlaqə saxlayacağıq.</p>}
      </form></section>
      <aside className={styles.summary}><p>SİFARİŞ XÜLASƏSİ</p>{items.map((item) => <div className={styles.food} key={item._id}><img src={item.imageUrl || 'https://via.placeholder.com/100'} alt={item.FoodName} /><div><h2>{item.FoodName}</h2><span>{item.quantity || 1} ədəd</span></div></div>)}<div className={styles.line}><span>Çatdırılma</span><b>Pulsuz</b></div><div className={styles.total}><span>Cəmi</span><b>{total.toFixed(2)} AZN</b></div></aside>
    </div>
  </main><Footer /></>;
}

export default Orderpage;
