import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import LoginIcon from '@mui/icons-material/Login';

function Navbar() {
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
        <div className={styles.searchContainer}>
        <input type="text" placeholder="Search..." className={styles.searchInput} />
        <button className={styles.searchButton}>Search</button>
        </div>
        
          <div className={styles.navActions}>
          <Link to="/wishlist">❤️wishlist</Link>
          <Link to="/basket">🛒basket</Link>
          <Link to="/login" className={styles.btn}><LoginIcon/>Login</Link>
          
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
