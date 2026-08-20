import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import styles from './footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brandColumn}>
          <Link to="/" className={styles.brand}><span>F</span>Foodie<i>.</i></Link>
          <p>Sevdiyiniz yeməklər, sevdiyiniz restoranlardan birbaşa qapınıza.</p>
          <div className={styles.socials}>
            <a href="https://instagram.com" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://facebook.com" aria-label="Facebook"><FacebookOutlinedIcon /></a>
          </div>
        </div>
        <div className={styles.links}>
          <div><h3>Kəşf et</h3><Link to="/menu">Restoranlar</Link><Link to="/">Kateqoriyalar</Link><Link to="/basket">Səbətim</Link></div>
          <div><h3>Dəstək</h3><Link to="/contact">Bizimlə əlaqə</Link><Link to="/orders">Sifarişlər</Link><a href="tel:+994501234567"><LocalPhoneOutlinedIcon /> +994 50 123 45 67</a></div>
        </div>
      </div>
      <div className={styles.bottom}><span>© {new Date().getFullYear()} Foodie. Bütün hüquqlar qorunur.</span><div><Link to="/contact">Məxfilik</Link><Link to="/contact">Şərtlər</Link></div></div>
    </footer>
  );
}

export default Footer;
