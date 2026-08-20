import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './AdminPage.module.scss';

const API_URL = 'http://localhost:5000';

function AdminPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('restaurants');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [restaurantRes, productRes] = await Promise.all([
        axios.get(`${API_URL}/restaurants`),
        axios.get(`${API_URL}/products`),
      ]);
      setRestaurants(restaurantRes.data);
      setProducts(productRes.data);
    } catch (err) {
      setError('Məlumatları yükləmək mümkün olmadı. Serverin işlədiyini yoxlayın.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const deleteItem = async (type, id) => {
    if (!window.confirm('Bu elementi silmək istədiyinizə əminsiniz?')) return;
    try {
      await axios.delete(`${API_URL}/${type}/${id}`);
      if (type === 'restaurants') setRestaurants((items) => items.filter((item) => item._id !== id));
      else setProducts((items) => items.filter((item) => item._id !== id));
    } catch (err) {
      setError('Element silinə bilmədi. Yenidən cəhd edin.');
    }
  };

  const items = activeTab === 'restaurants' ? restaurants : products;

  return (
    <main className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <Link to="/" className={styles.brand}><span>F</span> Foodie<span className={styles.dot}>.</span></Link>
        <p className={styles.adminLabel}>ADMIN PANEL</p>
        <button className={activeTab === 'restaurants' ? styles.active : ''} onClick={() => setActiveTab('restaurants')}>⌂ Restoranlar</button>
        <button className={activeTab === 'products' ? styles.active : ''} onClick={() => setActiveTab('products')}>◫ Məhsullar</button>
        <Link className={styles.backLink} to="/">← Sayta qayıt</Link>
      </aside>
      <section className={styles.content}>
        <header className={styles.topbar}>
          <div><p>İDARƏETMƏ PANELİ</p><h1>Xoş gəlmisiniz, admin</h1></div>
          <button className={styles.refresh} onClick={loadData}>↻ Yenilə</button>
        </header>
        <section className={styles.stats}>
          <article><span>🏪</span><div><b>{restaurants.length}</b><p>Restoran</p></div></article>
          <article><span>🍽️</span><div><b>{products.length}</b><p>Məhsul</p></div></article>
          <article><span>🏷️</span><div><b>{new Set(products.map((product) => product.category).filter(Boolean)).size}</b><p>Kateqoriya</p></div></article>
        </section>
        <section className={styles.tableCard}>
          <div className={styles.tableHeader}><div><p>{activeTab === 'restaurants' ? 'RESTORANLAR' : 'MƏHSULLAR'}</p><h2>{activeTab === 'restaurants' ? 'Restoran idarəetməsi' : 'Məhsul idarəetməsi'}</h2></div>{activeTab === 'products' ? <Link to="/admin/products/add">+ Məhsul əlavə et</Link> : <Link to="/upload-image">+ Şəkil yüklə</Link>}</div>
          {loading ? <p className={styles.status}>Yüklənir...</p> : error ? <p className={styles.error}>{error}</p> : (
            <div className={styles.items}>
              {items.length === 0 ? <p className={styles.status}>Hələ məlumat yoxdur.</p> : items.map((item) => (
                <article className={styles.item} key={item._id}>
                  <img src={activeTab === 'restaurants' ? item.logo : item.imageUrl} alt={activeTab === 'restaurants' ? item.CompanyName : item.FoodName} />
                  <div className={styles.itemInfo}><b>{activeTab === 'restaurants' ? item.CompanyName : item.FoodName}</b><span>{activeTab === 'restaurants' ? `Açılış: ${item.openTime || '—'} · Reytinq: ${item.rating || '—'}` : `${item.category || 'Kateqoriyasız'} · ${item.Price ?? item.price ?? '—'} AZN`}</span></div>
                  <button className={styles.delete} onClick={() => deleteItem(activeTab, item._id)}>Sil</button>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default AdminPage;
