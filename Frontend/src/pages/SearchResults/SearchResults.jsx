import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import styles from './SearchResults.module.scss'

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:5000/restaurants'),
      axios.get('http://localhost:5000/products'),
    ])
      .then(([restaurantsRes, foodsRes]) => {
        setRestaurants(restaurantsRes.data);
        setFoods(foodsRes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Yüklənir...</p>;

  const lowerQuery = query.toLowerCase();

  const matchedRestaurants = restaurants.filter((r) =>
    r.CompanyName?.toLowerCase().includes(lowerQuery)
  );

  const matchedFoods = foods.filter((f) =>
    f.FoodName?.toLowerCase().includes(lowerQuery)
  );

  const hasResults = matchedRestaurants.length > 0 || matchedFoods.length > 0;

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>"{query}" üçün nəticələr</h2>

      {!hasResults && <p className={styles.empty}>Heç bir nəticə tapılmadı</p>}

      {matchedRestaurants.length > 0 && (
        <div className={styles.section}>
          <h3>Restoranlar</h3>
          <div className={styles.restaurantsGrid}>
            {matchedRestaurants.map((r) => (
              <div
                key={r._id}
                className={styles.restaurantCard}
                onClick={() => navigate(`/restaurant/${r._id}`)}
              >
                <img src={r.logo} alt={r.CompanyName} />
                <h4>{r.CompanyName}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {matchedFoods.length > 0 && (
        <div className={styles.section}>
          <h3>Yeməklər</h3>
          <div className={styles.foodsGrid}>
            {matchedFoods.map((f) => (
              <div key={f._id} className={styles.foodCard} onClick={() => navigate('/orders', { state: { food: f } })}>
                <img src={f.imageUrl} alt={f.FoodName} />
                <h4>{f.FoodName}</h4>
                <p>{f.Price} AZN</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
