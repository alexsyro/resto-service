import React from 'react'
import styles from './Content.module.scss'
import ContentVideo from '../ContentVideo/ContentVideo'
import ContentAbout from '../ContentAbout/ContentAbout'
import ContentBook from '../ContentBook/ContentBook'
import ContentSlider from '../ContentSlider/ContentSlider'

function Content() {
  return (
    <div className={styles.content__div}>
      
      <ContentVideo />
      <ContentAbout /> 
      <ContentBook />
      <ContentSlider/>
    </div>
  )
}

export default Content
