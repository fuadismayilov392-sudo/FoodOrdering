import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import styles from './heroreciepe.module.scss';

function Heroreciepe() {
  return (
    <section className={styles.heroreciepe}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>GÜNÜN LƏZZƏTİ</p>
        <h1>Sevdiyiniz yemək, <em>bir neçə dəqiqəyə</em> qapınızda.</h1>
        <p className={styles.description}>Yaxınlıqdakı sevimli restoranlardan dadlı seçimləri kəşf edin və rahatlıqla sifariş verin.</p>
        <div className={styles.actions}>
          <Link to="/menu" className={styles.primaryAction}>Menyuya bax <ArrowForwardIcon /></Link>
          <Link to="/contact" className={styles.secondaryAction}>Restoranınız var?</Link>
        </div>
        <div className={styles.delivery}><LocalShippingOutlinedIcon /><span><b>Sürətli çatdırılma</b> · İsti və təzə</span></div>
      </div>
      <div className={styles.badge}><span>20–35</span><small>dəqiqə</small></div>
    </section>
  );
}

export default Heroreciepe;
