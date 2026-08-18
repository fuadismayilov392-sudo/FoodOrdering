import { useNavigate } from 'react-router-dom';
import styles from './cetegoriesSection.module.scss';

function CategorySection() {
  const navigate = useNavigate();
  const categories = [
    { id: 'soup', label: 'Şorbalar', icon: '🥣', className: 'categoriesSection__item1' },
    { id: 'salad', label: 'Salatlar', icon: '🥗', className: 'categoriesSection__item2' },
    { id: 'maincourse', label: 'Əsas yeməklər', icon: '🍝', className: 'categoriesSection__item3' },
    { id: 'deserts', label: 'Desertlər', icon: '🍰', className: 'categoriesSection__item4' },
    { id: 'drinks', label: 'İçkilər', icon: '🍹', className: 'categoriesSection__item5' },
    { id: 'snacks', label: 'Qəlyanaltılar', icon: '🥨', className: 'categoriesSection__item6' },
  ];

  return (
    <section className={styles.categoriesSection} aria-labelledby="categories-title">
      <div className={styles.categoriesSection__heading}>
        <p>MENYUNU KƏŞF EDİN</p>
        <h2 id="categories-title">Nə yemək istəyirsiniz?</h2>
      </div>
      <div className={styles.categoriesSection__list}>
        {categories.map((cat) => (
          <button type="button" key={cat.id} className={`${styles.categoriesSection__item} ${styles[cat.className]}`} onClick={() => navigate(`/category/${cat.id}`)}>
            <span className={styles.categoriesSection__icon} aria-hidden="true">{cat.icon}</span>
            <h3>{cat.label}</h3>
            <span className={styles.categoriesSection__link}>Seçimlərə bax →</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
