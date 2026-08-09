import { useContext } from 'react';
import { DataContext } from '../../Context/DataContext.jsx';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import styles from './BasketPage.module.scss';
import Navbar from '../../layouts/header.jsx';

function BasketPage() {
  const { basket, removeFromBasket, updateQuantity } = useContext(DataContext);

  const total = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (basket.length === 0) {
    return (
      <div className={styles.emptyState}>
        <ShoppingBag size={48} />
        <p>Səbətiniz boşdur</p>
      </div>
    );
  }

  return (
    <>
    <Navbar />
    
    <div className={styles.basketPage}>
      <h1 className={styles.title}>Səbətim</h1>

      <div className={styles.items}>
        {basket.map((item) => (
          <div className={styles.item} key={item._id}>
            <img
              src={item.imageUrl || 'https://via.placeholder.com/80'}
              alt={item.FoodName}
              className={styles.itemImage}
            />

            <div className={styles.itemInfo}>
              <h4>{item.FoodName}</h4>
              <p className={styles.company}>{item.CompanyName}</p>
              <p className={styles.price}>{item.price} AZN</p>
            </div>

            <div className={styles.quantityControl}>
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                <Minus size={14} />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                <Plus size={14} />
              </button>
            </div>

            <div className={styles.itemTotal}>
              {(item.price * item.quantity).toFixed(2)} AZN
            </div>

            <button
              className={styles.removeBtn}
              onClick={() => removeFromBasket(item._id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Cəmi</span>
          <strong>{total.toFixed(2)} AZN</strong>
        </div>
        <button className={styles.checkoutBtn}>Sifarişi tamamla</button>
      </div>
    </div>
 </>
  );
}

export default BasketPage;