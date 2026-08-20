import React from 'react'
import Navbar from '../../layouts/header'
import styles from './homepage.module.scss'
import Heroreciepe from '../../components/heroreciepe'
import CategoriesSection from '../../components/categorylist/categoriesSection'
import Body from '../../components/body/body'
import Footer from '../../layouts/footer'

function Homepage() {
  return (
    <>
        <Navbar />
        <Heroreciepe />
        <CategoriesSection />
        <Body />
        <Footer />
    </>
  )
}

export default Homepage
