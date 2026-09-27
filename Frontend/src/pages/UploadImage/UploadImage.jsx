import { useState } from 'react';
import { api } from '../../config/api.js';

function UploadImage() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!imageFile) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadedUrl(res.data.imageUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Şəkil yüklə</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Yüklənir...' : 'Yüklə'}
      </button>

      {uploadedUrl && (
        <div style={{ marginTop: 20 }}>
          <p>Link (bunu kopyala, Postman-da istifadə et):</p>
          <input type="text" value={uploadedUrl} readOnly style={{ width: '100%' }} />
          <img src={uploadedUrl} alt="preview" style={{ width: 200, marginTop: 10 }} />
        </div>
      )}
    </div>
  );
}

export default UploadImage;
