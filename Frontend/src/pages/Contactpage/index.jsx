import React, { useState } from 'react';
import styles from "./index.module.scss";
import Navbar from '../../layouts/header'
function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form göndərildi:", formData);
    // Burada backend API-yə POST sorğu göndərə bilərsən
  };

  return (
    <>
    <Navbar/>
    <div className={styles.page}>
      <h1>Bizimlə əlaqə saxlayın</h1>
      <form className={styles.form} onSubmit={handleSubmit} >
        <input type = "text" placeholder='name' required></input>
        <input type ="email" placeholder='email' requires></input>
        <textarea placeholder='mesajınız'></textarea>
        <button type='submit'>Gondər</button>
      </form>

      <div >
        <h3> Əlaqə məlumatları</h3>
        <p>Email: info@mysite.com</p>
        <p>Telefon: +994 50 123 45 67</p>
        <p>Ünvan: Bakı, Azərbaycan</p>
      </div>
    </div>
    </>
  );
}

export default ContactPage;
