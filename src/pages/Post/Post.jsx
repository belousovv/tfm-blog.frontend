import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostItem from '../../components/PostItem/PostItem'
import { selectAuthUser } from '../../redux/slices/auth-selector'
import { fetchOnePost } from '../../redux/slices/posts-slice'
import styles from './Post.module.scss'

const Post = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(selectAuthUser)
  const [post, setPost] = React.useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    dispatch(fetchOnePost(id))
      .then((res) => {
        setPost(res.payload)
        setStatus('loaded')
      })
      .catch((error) => {
        console.warn(error)
        setStatus('error')
      })
  }, [id, dispatch])

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
