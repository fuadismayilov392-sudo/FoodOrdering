import React from 'react'
import Navbar from '../../layouts/header'
import styles from './homepage.module.scss'
import Heroreciepe from '../../components/heroreciepe'
import CategoriesSection from '../../components/categorylist/categoriesSection'
import Body from '../../components/body/body'

function Homepage() {
  return (
    <>
        <Navbar />
        <Heroreciepe />
        <CategoriesSection />
        <Body />
    </>
  )
}

export default Homepage
