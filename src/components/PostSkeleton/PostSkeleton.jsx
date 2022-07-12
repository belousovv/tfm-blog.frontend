import React from 'react'
import styles from './PostSkeleton.module.scss'

const PostSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={`${styles.avatar} ${styles.anim}`}></div>
      <div className={styles.wrapper}>
        <div className={`${styles.name} ${styles.anim}`}></div>
        <div className={`${styles.title} ${styles.anim}`}></div>
        <div className={`${styles.text} ${styles.anim}`}></div>
        <div className={`${styles.text} ${styles.anim}`}></div>
      </div>
    </div>
  )
}

export default PostSkeleton
