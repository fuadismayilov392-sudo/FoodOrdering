import axios from 'axios'
import react , { useState , useEffect , useContext } from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from '../../Context/DataContext.jsx';
import styles from './RestaurantMenuPage.module.scss'


function RestaurantMenuPage() {

    const {id}  = useParams();
    const { addToBasket } = useContext(DataContext);
    const [restaurant , setRestaurant] = useState(null);
    const [foods , setFoods] = useState([]);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            axios.get(`http://localhost:5000/restaurants/${id}`),
            axios.get(`http://localhost:5000/restaurant/${id}`)
        ])
        .then(([restaurantRes , foodsRes]) => {
            setRestaurant(restaurantRes.data);
            setFoods(foodsRes.data);
            setLoading(false);
        })
        .catch((err) =>{
            console.log(err);
            setLoading(false);
        });
    },[id])

    if(loading) return <p>Yüklənir...</p>;

    return (

        <div className = {styles.page}>
            {restaurant && (
                <div className = {styles.header}>
                    <img src = {restaurant.logo || 'https://via.placeholder.com/300'} alt = {restaurant.CompanyName} className = {styles.logo}/>
                    <div>
                        <h1>{restaurant.CompanyName}</h1>
                         <p>Açılır: {restaurant.openTime} · 😊 {restaurant.rating}</p>
                         </div>
                    </div>
            )}
        
        <div className = {styles['foods-grid']}>
            {foods.map((food) => (
                <div className = { styles["food-card"]} key = {food._id}>
                    <img
                    src = {food.imageUrl || 'https://via.placeholder.com/300'}
                    alt = {food.FoodName}
                    className = {styles["food-image"]}/>

                    <div className = {styles["food-info"]}>
                        <h4>{food.FoodName}</h4>
                        <p className = {styles.description}>{food.description}</p>
                        <div className = {styles.footer}>
                            <span className = {styles.price}>{food.Price.toFixed(2)} AZN</span>
                            <button 
                            className = {styles["ass-btn"]}
                            onClick = {() => addToBasket(food)}> Səbətə at </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
}

export default RestaurantMenuPage
