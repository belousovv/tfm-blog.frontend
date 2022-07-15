import React from 'react'
import cn from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import styles from './PostItem.module.scss'
import Avatar from '../Avatar/Avatar'
import PostSkeleton from '../PostSkeleton/PostSkeleton'
import defaultAvatar from '../../images/default-avatar.jpg'
import dateFilter from '../../utils/date-filter'
import {
  faEye,
  faHeart,
  faClock,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import {
  fetchLike,
  fetchUnlike,
  removePost,
} from '../../redux/slices/posts-slice'

const PostItem = ({ post, isLoading, isPage, isLiked, isOwner }) => {
  const navigate = useNavigate()
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
    if (window.confirm('Вы действительно хотите удалить пост?')) {
      if (isPage) {
        dispatch(removePost(id))
        navigate('/')
      } else {
        dispatch(removePost(id))
      }
    }
  }

  const editPostHandler = () => {
    navigate(`/post-edit/${post.post_id}`)
  }

  if (isLoading) {
    return <PostSkeleton />
  }

  return (
    <div className={styles['post-item']}>
      {post.image_url && isPage && (
        <img
          className={styles['img-post']}
          src={`https://tfm-blog.herokuapp.com/${post.image_url}`}
          alt='картинка к посту'
        />
      )}
      <div className={styles.wrapper}>
        <Avatar
          image={
            post.avatar_url
              ? `https://tfm-blog.herokuapp.com/${post.avatar_url}`
              : defaultAvatar
          }
        />
        <div className={styles.content}>
          <div className={styles['name-buttons-wrapper']}>
            <h4 className={styles.name}>{post.name}</h4>
            <div className={styles.buttons}>
              {isOwner && (
                <div className={styles.edit}>
                  <FontAwesomeIcon
                    className={styles.pen}
                    icon={faPen}
                    onClick={editPostHandler}
                  />
                  <FontAwesomeIcon
                    className={styles.trash}
                    icon={faTrash}
                    onClick={() => removePostHandler(post.post_id)}
                  />
                </div>
              )}
              <div
                className={styles['like-btn']}
                onClick={isLiked ? removeLikeHandler : addLikeHandler}
              >
                <FontAwesomeIcon
                  className={iconClass}
                  icon={faHeart}
                  size='2x'
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className={isPage ? styles['title-post'] : styles.title}>
              {isPage ? (
                <>{post.title}</>
              ) : (
                <NavLink to={`/posts/${post.post_id}`}>{post.title}</NavLink>
              )}
            </h2>
            {isPage && (
              <span className={styles.text}>
                <ReactMarkdown>{post.text}</ReactMarkdown>
              </span>
            )}
            <div className={styles['data-wrapper']}>
              <ul className={styles['tags-list']}>
                {post.tags.map((t, index) => (
                  <li key={index} className={styles['tags-item']}>
                    <NavLink className={styles['tags-link']} to={`/tags/${t}`}>
                      #{t}
                    </NavLink>
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
    </div>
  )
}

export default React.memo(PostItem)
