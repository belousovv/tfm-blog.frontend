import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <div className={styles.logo}>
      <NavLink to='/'>tfm-blog</NavLink>
    </div>
  )
}

export default Logo
