import React from 'react'
import Container from '../Container/Container'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.wrapper}>
          <p className={styles.copy}>
            &copy; Copyright 2022. All Rights Reserved.
          </p>
          <ul styles={styles.contacts}>
            <li className={styles.item}>
              <a
                className={styles.link}
                href='https://www.transformice.com/'
                target='_blank'
                rel='noreferrer'
              >
                official site
              </a>
            </li>
            <li className={styles.item}>
              <a
                className={styles.link}
                href='https://atelier801.com/forums'
                target='_blank'
                rel='noreferrer'
              >
                atelier forums
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
