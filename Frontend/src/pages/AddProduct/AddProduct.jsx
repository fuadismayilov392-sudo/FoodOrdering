import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AddProduct.module.scss';

const API_URL = 'http://localhost:5000';
const categories = [
  { value: 'soup', label: 'Şorba' },
  { value: 'salad', label: 'Salat' },
  { value: 'maincourse', label: 'Əsas yemək' },
  { value: 'deserts', label: 'Desert' },
  { value: 'drinks', label: 'İçki' },
  { value: 'snacks', label: 'Qəlyanaltı' },
];

const initialForm = {
  FoodName: '',
  Price: '',
  imageUrl: '',
  description: '',
  category: '',
  restaurantId: '',
};

function AddProduct() {
  const [form, setForm] = useState(initialForm);
  const [restaurants, setRestaurants] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/restaurants`)
      .then((response) => setRestaurants(response.data))
      .catch(() => setError('Restoran siyahısı yüklənmədi. Serverin işlədiyini yoxlayın.'));
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const uploadImage = async () => {
    if (!imageFile) return;
    setError('');
    setIsUploading(true);
    const data = new FormData();
    data.append('image', imageFile);

    try {
      const response = await axios.post(`${API_URL}/upload`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm((current) => ({ ...current, imageUrl: response.data.imageUrl }));
    } catch {
      setError('Şəkil yüklənmədi. Yenidən cəhd edin.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await axios.post(`${API_URL}/products`, { ...form, Price: Number(form.Price) });
      navigate('/admin');
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Məhsul əlavə edilə bilmədi. Məlumatları yoxlayın.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.heading}>
          <div>
            <p>ADMIN PANEL</p>
            <h1>Yeni məhsul əlavə et</h1>
            <span>Məhsul məlumatlarını doldurun, sonra menyuda görünsün.</span>
          </div>
          <Link to="/admin">← İdarəetmə paneli</Link>
        </div>

        {error && <p className={styles.error} role="alert">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className={styles.fields}>
            <label>
              Məhsulun adı
              <input name="FoodName" value={form.FoodName} onChange={updateField} placeholder="Məsələn, Toyuq burger" required />
            </label>
            <label>
              Qiymət (AZN)
              <input name="Price" type="number" min="0" step="0.01" value={form.Price} onChange={updateField} placeholder="8.50" required />
            </label>
            <label>
              Restoran
              <select name="restaurantId" value={form.restaurantId} onChange={updateField} required>
                <option value="">Restoran seçin</option>
                {restaurants.map((restaurant) => <option key={restaurant._id} value={restaurant._id}>{restaurant.CompanyName}</option>)}
              </select>
            </label>
            <label>
              Kateqoriya
              <select name="category" value={form.category} onChange={updateField} required>
                <option value="">Kateqoriya seçin</option>
                {categories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}
              </select>
            </label>
            <label className={styles.fullWidth}>
              Şəkil linki
              <input name="imageUrl" type="url" value={form.imageUrl} onChange={updateField} placeholder="https://..." required />
            </label>
            <label className={styles.fullWidth}>
              Açıqlama
              <textarea name="description" value={form.description} onChange={updateField} placeholder="Məhsul haqqında qısa məlumat" rows="4" />
            </label>
          </div>

          <div className={styles.uploadArea}>
            <div><b>Şəkli kompüterdən yüklə</b><span>Yüklədikdən sonra link avtomatik əlavə ediləcək.</span></div>
            <input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} />
            <button type="button" onClick={uploadImage} disabled={!imageFile || isUploading}>{isUploading ? 'Yüklənir...' : 'Şəkli yüklə'}</button>
          </div>

          {form.imageUrl && <img className={styles.preview} src={form.imageUrl} alt="Məhsul önizləməsi" />}

          <div className={styles.actions}>
            <Link to="/admin">Ləğv et</Link>
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Əlavə edilir...' : 'Məhsulu əlavə et'}</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AddProduct;
