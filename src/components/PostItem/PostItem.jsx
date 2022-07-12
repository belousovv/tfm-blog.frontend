import React from 'react'
import styles from './PostItem.module.scss'
import Avatar from '../Avatar/Avatar'
import PostSkeleton from '../PostSkeleton/PostSkeleton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faHeart,
  faClock,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'
import defaultAvatar from '../../images/default-avatar.jpg'
import dateFilter from '../../utils/date-filter'
import { useDispatch } from 'react-redux'
import {
  fetchLike,
  fetchUnlike,
  removePost,
} from '../../redux/slices/posts-slice'
import { NavLink } from 'react-router-dom'

const PostItem = ({ post, isLoading, isPage, isLiked, isOwner }) => {
  const dispatch = useDispatch()
  const iconClass = cn(
    styles['like-icon'],
    isLiked ? styles['like-icon-active'] : ''
  )

  const addLikeHandler = () => {
    dispatch(fetchLike(post.post_id))
  }

  const removeLikeHandler = () => {
    dispatch(fetchUnlike(post.post_id))
  }

  const removePostHandler = (id) => {
    dispatch(removePost(id))
  }

  if (isLoading) {
    return <PostSkeleton />
  }

  return (
    <div className={styles['post-item']}>
      {post.image_url && (
        <img
          className={isPage ? styles['img-post'] : styles.img}
          src={`http://localhost:4444/${post.image_url}`}
          alt='картинка к посту'
        />
      )}
      <div className={styles.wrapper}>
        <Avatar image={post.avatar_url || defaultAvatar} />
        <div className={styles.content}>
          <h4 className={styles.name}>{post.name}</h4>
          <div>
            <h2 className={styles.title}>
              {isPage ? (
                <>{post.title}</>
              ) : (
                <NavLink to={`posts/${post.post_id}`}>{post.title}</NavLink>
              )}
            </h2>
            <p className={styles.text}>
              {isPage ? post.text : post.text.substring(0, 50) + '...'}
            </p>
            <div className={styles['data-wrapper']}>
              <ul className={styles['tags-list']}>
                {post.tags.map((t, index) => (
                  <li key={index} className={styles['tags-item']}>
                    <a className={styles['tags-link']} href={`tags/${t}`}>
                      #{t}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className={styles['data-list']}>
                <li className={styles['data-item']}>
                  <FontAwesomeIcon icon={faHeart} />
                  <span className={styles.data}>{post.likes.length}</span>
                </li>
                <li className={styles['data-item']}>
                  <FontAwesomeIcon icon={faEye} />
                  <span className={styles.data}>{post.views}</span>
                </li>
                <li className={styles['data-item']}>
                  <FontAwesomeIcon icon={faClock} />
                  <span className={styles.data}>
                    {dateFilter(post.created_at)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles['like-btn']}
        onClick={isLiked ? removeLikeHandler : addLikeHandler}
      >
        <FontAwesomeIcon className={iconClass} icon={faHeart} size='2x' />
      </div>
      {isOwner && (
        <div className={styles.edit}>
          <FontAwesomeIcon className={styles.pen} icon={faPen} />
          <FontAwesomeIcon
            className={styles.trash}
            icon={faTrash}
            onClick={() => removePostHandler(post.post_id)}
          />
        </div>
      )}
    </div>
  )
}

export default React.memo(PostItem)
