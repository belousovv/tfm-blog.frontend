import React from 'react'
import Container from '../Container/Container'
import styles from './Content.module.scss'

const Content = ({ children }) => {
  return (
    <main className={styles.main}>
      <Container>{children}</Container>
    </main>
  )
}

export default Content
