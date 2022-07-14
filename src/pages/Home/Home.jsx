import React, { useEffect } from 'react'
import styles from './Home.module.scss'
import PostItem from '../../components/PostItem/PostItem'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectPosts,
  selectPostsStatus,
} from '../../redux/slices/posts-selectors'
import { fetchPosts, fetchPostsByTag } from '../../redux/slices/posts-slice'
import { selectAuthUser, selectIsAuth } from '../../redux/slices/auth-selector'
import { useNavigate, useParams } from 'react-router-dom'
import Paginator from '../../components/Paginator/Paginator'
import Button from '../../components/Button/Button'

const Home = () => {
  const posts = useSelector(selectPosts)
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tag } = useParams()

  const user = useSelector(selectAuthUser)
  const postsStatus = useSelector(selectPostsStatus)

  useEffect(() => {
    if (tag) {
      dispatch(fetchPostsByTag({ tag }))
    } else {
      dispatch(fetchPosts())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag])

  const onNewPost = React.useCallback(() => {
    navigate('/post-edit')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className={styles.home}>
      <div className={styles.btn}>
        <Button
          text='Новый пост'
          isDisabled={!isAuth}
          clickHandler={onNewPost}
        />
      </div>
      <Paginator />
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
