import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import LoginIcon from '@mui/icons-material/Login';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [products, setProducts] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link to="/" aria-label="Foodie ana səhifə" onClick={closeMenu}>
            <span className={styles.logoMark} aria-hidden="true">F</span>
            <span>Foodie<span className={styles.logoDot}>.</span></span>
          </Link>
        </div>
        <button className={styles.menuButton} type="button" aria-label="Menyunu aç" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((isOpen) => !isOpen)}>
          <span></span><span></span><span></span>
        </button>

        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <ul className={styles.navLinks}>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/menu" onClick={closeMenu}>Menu</Link></li>
            <li><Link to="/orders" onClick={closeMenu}>Orders</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
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
            <Link to="/basket" className={styles.basketLink} onClick={closeMenu}><ShoppingBagOutlinedIcon/><span>Səbət</span></Link>
            <Link to="/register" className={styles.registerLink} onClick={closeMenu}><PersonAddAlt1OutlinedIcon/><span>Qeydiyyat</span></Link>
            <Link to="/login" className={styles.btn} onClick={closeMenu}><LoginIcon/>Daxil ol</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
