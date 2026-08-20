import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './MenuPage.module.scss'
import Navbar from '../../layouts/header'
import Footer from '../../layouts/footer'


function Menupage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/restaurants")
    .then((res) => {
      setRestaurants(res.data);
      setLoading(false);
    })
    .catch((err) =>{
      console.log(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Yüklənir...</p>;


  return (
    <>
    <Navbar/>
    <div className = {styles.page}>
      
      <div className = {styles['restaurants-grid']}>
        {restaurants.map((restaurant) => (
          <div className = {styles["restaurant-card"]} key={restaurant._id} 
          onClick={() => navigate(`/restaurant/${restaurant._id}`)}>
            <div className = {styles["image-wrapper"]}>
              <img 
                src = {restaurant.logo || "http://localhost:5000/uploads/1786832214949-images.webp"}
                alt = {restaurant.CompanyName}
                className = {styles["restaurant-image"]}/>
                </div>
                <div className = {styles["restaurant-info"]}>
                  <h3 className = {styles["restaurant-name"]}>{restaurant.CompanyName}</h3>
                  <div className = {styles["meta-row"]}>
                    <span>😊 {restaurant.rating || '9.0'}</span>
                    <span className = {styles.dot}>·</span>
                    <span >Açılır: {restaurant.openTime || '10:00'}</span>
                  </div>
                </div>
              </div>
        ))}
    </div>
    </div>
    <Footer />
    </>
  )
}

export default Menupage
