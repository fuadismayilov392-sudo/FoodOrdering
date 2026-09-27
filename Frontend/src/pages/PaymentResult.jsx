import { useEffect, useState } from 'react';
import { api } from '../config/api.js';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../layouts/header';
import Footer from '../layouts/footer';
import styles from './Orderspage/index.module.scss';


export default function PaymentResult() {
  const [params] = useSearchParams();
  const [state, setState] = useState({ loading: true, status: '' });
  const paymentId = params.get('paymentId');
  useEffect(() => {
    if (!paymentId) return setState({ loading: false, status: 'invalid' });
    api.get(`/payments/${paymentId}/status`).then(({ data }) => setState({ loading: false, ...data })).catch(() => setState({ loading: false, status: 'unknown' }));
  }, [paymentId]);
  const text = state.status === 'APPROVED' ? `Ödəniş uğurla qəbul edildi${state.amount ? `: ${Number(state.amount).toFixed(2)} AZN` : ''}.` : state.status === 'PENDING' ? 'Ödəniş hələ təsdiqlənir. Bir neçə saniyə sonra səhifəni yeniləyin.' : state.status === 'DECLINED' ? 'Ödəniş bank tərəfindən rədd edildi.' : 'Ödənişin statusunu yoxlamaq mümkün olmadı.';
  return <><Navbar /><main className={styles.empty}><span>{state.loading ? '⏳' : state.status === 'APPROVED' ? '✅' : 'ℹ️'}</span><h1>{state.loading ? 'Ödəniş yoxlanılır…' : 'Ödəniş nəticəsi'}</h1>{!state.loading && <p>{text}</p>}<Link to="/menu">Menyuya qayıt</Link></main><Footer /></>;
}
