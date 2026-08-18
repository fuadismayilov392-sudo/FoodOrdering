import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styles from './Body.module.scss'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { DataContext } from '../../Context/DataContext.jsx';

function Body() {
  const { basket, addToBasket } = useContext(DataContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [])

  if (loading) return <p>Yüklənir...</p>;

  return (
    <div className={styles.page}>
      <div className={styles['products-grid']}>
        {products.map((product) => (
          <div className={styles['product-card']} key={product._id} onClick={() => navigate('/orders', { state: { food: product } })}>
            <div className={styles['image-wrapper']}>
              <img
                src={product.imageUrl || 'https://via.placeholder.com/400x250'}
                alt={product.FoodName}
                className={styles['product-image']}
              />
              <button className={styles['basket-button']} onClick={(event) => { event.stopPropagation(); addToBasket(product); }}>
                🛒
              </button>
            </div>
            <div className={styles['product-info']}>
              <div className={styles['name-row']}>
                <h3 className={styles['product-name']}>{product.FoodName}</h3>
                <span className={styles.badge}>W+</span>
              </div>
              <div className={styles['meta-row']}>
                <span className={styles.rating}>😊 {product.rating || '9.0'}</span>
                <span className={styles.dot}>·</span>
                <span className={styles.delivery}>🛵 {product.price} AZN</span>
              </div>
              <div className={styles['time-row']}>
                <span className={styles['open-time']}>Açılır: {product.openTime || '10:00'}</span>
                <span className={styles.dot}>·</span>
                <span className={styles.schedule}>İndi planlaşdır</span>
                <button className={styles['order-button']}>Sifariş et</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Body
