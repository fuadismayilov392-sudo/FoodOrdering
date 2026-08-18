import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import LoginIcon from '@mui/icons-material/Login';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [products, setProducts] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:5000/restaurants'),
      axios.get('http://localhost:5000/products'),
    ])
      .then(([restaurantRes, productRes]) => {
        setRestaurants(restaurantRes.data);
        setProducts(productRes.data);
      })
      .catch((error) => console.error('Axtarış təklifləri yüklənmədi:', error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsSearchFocused(false);
    }
  };

  const query = searchTerm.trim().toLowerCase();
  const restaurantSuggestions = query ? restaurants.filter((restaurant) => restaurant.CompanyName?.toLowerCase().includes(query)).slice(0, 3) : [];
  const productSuggestions = query ? products.filter((product) => product.FoodName?.toLowerCase().includes(query)).slice(0, 3) : [];
  const suggestions = [...restaurantSuggestions.map((item) => ({ ...item, type: 'restaurant' })), ...productSuggestions.map((item) => ({ ...item, type: 'product' }))];

  const selectSuggestion = (suggestion) => {
    setIsSearchFocused(false);
    if (suggestion.type === 'restaurant') navigate(`/restaurant/${suggestion._id}`);
    else navigate(`/search?q=${encodeURIComponent(suggestion.FoodName)}`);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link to="/" aria-label="Foodie ana səhifə">
            <span className={styles.logoMark} aria-hidden="true">F</span>
            <span>Foodie<span className={styles.logoDot}>.</span></span>
          </Link>
        </div>
        <ul className={styles.navLinks}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <form className={styles.searchContainer} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
          />
          <button type="submit" className={styles.searchButton}>Search</button>
          {isSearchFocused && query && (
            <div className={styles.searchSuggestions} role="listbox">
              {suggestions.length ? suggestions.map((suggestion) => (
                <button type="button" key={`${suggestion.type}-${suggestion._id}`} onMouseDown={() => selectSuggestion(suggestion)}>
                  <span className={styles.suggestionIcon}>{suggestion.type === 'restaurant' ? '🏪' : '🍽️'}</span>
                  <span><b>{suggestion.type === 'restaurant' ? suggestion.CompanyName : suggestion.FoodName}</b><small>{suggestion.type === 'restaurant' ? 'Restoran' : 'Yemək'}</small></span>
                </button>
              )) : <p>Uyğun nəticə tapılmadı</p>}
            </div>
          )}
        </form>

        <div className={styles.navActions}>
          <Link to="/basket">🛒basket</Link>
          <Link to = "/register">Sign up</Link>
          <Link to="/login" className={styles.btn}><LoginIcon/>Login</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
