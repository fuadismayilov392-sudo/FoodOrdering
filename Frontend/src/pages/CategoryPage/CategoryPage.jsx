import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './CategoryPage.module.scss'
import Navbar from '../../layouts/header'

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/category/${category}`)
      .then((res) => {
        setFoods(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <p>Yüklənir...</p>;

  return (
  
    <>
    <Navbar/>
    <div className={styles.page}>
      <h2>{category}</h2>
      <div className={styles.foodsGrid}>
        {foods.map((food) => (
          <div key={food._id} className={styles.foodCard} onClick={() => navigate('/orders', { state: { food } })}>
            <img src={food.imageUrl} alt={food.FoodName} />
            <h4>{food.FoodName}</h4>
            <p>{food.Price} AZN</p>
          </div>
        ))}
      </div>
    </div>
    </>
    );
}

export default CategoryPage;
