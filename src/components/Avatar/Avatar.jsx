import React from 'react'
import styles from './Avatar.module.scss'

const Avatar = ({ image }) => {
  return (
    <div className={styles.avatar}>
      <img className={styles.img} src={image} alt='аватарка' />
    </div>
  )
}

export default Avatar
