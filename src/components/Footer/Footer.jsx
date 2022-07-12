import React from 'react'
import Container from '../Container/Container'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <p>&copy; Copyright 2022. All Rights Reserved.</p>
      </Container>
    </footer>
  )
}

export default Footer
