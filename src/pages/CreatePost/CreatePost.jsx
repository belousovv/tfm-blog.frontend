import React from 'react'
import PostEdit from '../../components/PostEdit/PostEdit'
import styles from './CreatePost.module.scss'

const CreatePost = () => {
  return (
    <section className={styles['create-post']}>
      <PostEdit />
    </section>
  )
}

export default CreatePost
