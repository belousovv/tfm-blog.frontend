import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Logo.module.scss'
import img from '../../images/logo.png'

const Logo = () => {
  return (
    <div className={styles.logo}>
      <NavLink className={styles.link} to='/'>
        <img className={styles.img} src={img} alt='logo' />
        <div>Tfm-blog</div>
      </NavLink>
    </div>
  )
}

export default Logo
