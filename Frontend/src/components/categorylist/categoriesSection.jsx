import React from 'react'
import styles from './cetegoriesSection.module.scss'

function CategoriesSection() {
  return (
    <div className={styles.categoriesSection}>
        <ul className={styles.categoriesSection__list}>
            <li className={styles.categoriesSection__item + ' ' + styles.categoriesSection__item1}>Soup</li>
            <li className={styles.categoriesSection__item + ' ' + styles.categoriesSection__item2}>Salad</li>
            <li className={styles.categoriesSection__item + ' ' + styles.categoriesSection__item3}>Main Course</li>
            <li className={styles.categoriesSection__item + ' ' + styles.categoriesSection__item4}>Dessert</li>
            <li className={styles.categoriesSection__item + ' ' + styles.categoriesSection__item5}>Drinks</li>
            <li className={styles.categoriesSection__item + ' ' + styles.categoriesSection__item6}>Snacks</li>
            <li className={styles.categoriesSection__item + ' ' + styles.categoriesSection__item7}>Appetizers</li>
        </ul>
    </div>
  )
}

export default CategoriesSection
