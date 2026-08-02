import React from 'react'
import Navbar from '../../layouts/header'
import styles from './homepage.module.scss'
import Heroreciepe from '../../components/heroreciepe'
import CategoriesSection from '../../components/categorylist/categoriesSection'

function Homepage() {
  return (
    <>
        <Navbar />
        <Heroreciepe />
        <CategoriesSection />
    </>
  )
}

export default Homepage
