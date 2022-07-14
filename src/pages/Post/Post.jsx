import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostItem from '../../components/PostItem/PostItem'
import { selectAuthUser } from '../../redux/slices/auth-selector'
import { addViews, fetchOnePost } from '../../redux/slices/posts-slice'
import { selectPostById } from '../../redux/slices/posts-selectors'
import styles from './Post.module.scss'

const Post = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(selectAuthUser)
  const [status, setStatus] = useState('loading')
  const post = useSelector(selectPostById(id))

  useEffect(() => {
    dispatch(fetchOnePost(id))
      .then(() => {
        setStatus('loaded')
      })
      .catch((error) => {
        console.warn(error)
        setStatus('error')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(addViews(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className={styles.post}>
      <PostItem
        post={post}
        isPage={true}
        isLiked={post?.likes.includes(user?.user_id)}
        isLoading={status === 'loading'}
        isOwner={user?.user_id === post?.user_id}
      />
    </section>
  )
}

export default Post
