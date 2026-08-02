import React from 'react'
import styles from './heroreciepe.module.scss'

function Heroreciepe() {
  return (
    <div className={styles.heroreciepe}>
    
    <button className={styles.heroreciepe__button}>Order Now</button>
    <button className={styles.heroreciepe__wishlist}>Add to Wishlist</button>

    </div>
  )
}

export default Heroreciepe
