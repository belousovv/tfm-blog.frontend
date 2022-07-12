import React, { useEffect } from 'react'
import styles from './Home.module.scss'
import PostItem from '../../components/PostItem/PostItem'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectPosts,
  selectPostsStatus,
} from '../../redux/slices/posts-selectors'
import { fetchPosts } from '../../redux/slices/posts-slice'
import { selectAuthUser } from '../../redux/slices/auth-selector'

const Home = () => {
  const posts = useSelector(selectPosts)
  const dispatch = useDispatch()

  const user = useSelector(selectAuthUser)
  const postsStatus = useSelector(selectPostsStatus)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <section className={styles.home}>
      {posts.map((p) => (
        <PostItem
          key={p.post_id}
          post={p}
          isPage={false}
          isLiked={p.likes.includes(user?.user_id)}
          isLoading={postsStatus === 'loading'}
          isOwner={user && user.user_id === p.user_id}
        />
      ))}
    </section>
  )
}

export default Home
