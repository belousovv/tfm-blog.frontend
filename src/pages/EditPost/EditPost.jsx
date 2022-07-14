import React from 'react'
import styles from './EditPost.module.scss'
import PostEdit from '../../components/PostEdit/PostEdit'

const EditPost = () => {
  return (
    <section className={styles['edit-post']}>
      <PostEdit />
    </section>
  )
}

export default EditPost
