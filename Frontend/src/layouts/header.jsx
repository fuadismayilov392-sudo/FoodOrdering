import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import LoginIcon from '@mui/icons-material/Login';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link to="/">Foodie</Link>
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
          />
          <button type="submit" className={styles.searchButton}>Search</button>
        </form>

        <div className={styles.navActions}>
          <Link to="/basket">🛒basket</Link>
          <Link to="/login" className={styles.btn}><LoginIcon/>Login</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;