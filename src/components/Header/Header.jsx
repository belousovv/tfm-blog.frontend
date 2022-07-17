import React, { useEffect, useRef, useState } from 'react'
import styles from './Header.module.scss'
import Container from '../Container/Container'
import Logo from '../Logo/Logo'
import Avatar from '../Avatar/Avatar'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthUser, selectIsAuth } from '../../redux/slices/auth-selector'
import { logout } from '../../redux/slices/auth-slice'
import defaultAvatar from '../../images/default-avatar.jpg'
import instance from '../../api/api'

const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const user = useSelector(selectAuthUser)
  const fileRef = useRef(null)
  const [avatar, setAvatar] = useState(defaultAvatar)

  useEffect(() => {
    if (user?.avatar_url) {
      setAvatar(
        (process.env.REACT_APP_API_URL || 'http://localhost:4444/') +
          user.avatar_url
      )
    }
  }, [user])

  const onLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout())
    }
  }

  const avatarClickHandler = () => {
    fileRef.current.click()
  }

  const onFileChange = async (e) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file, `${new Date().toISOString()}-${file.name}`)
      const { data } = await instance.post('/avatar', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      setAvatar(
        (process.env.REACT_APP_API_URL || 'http://localhost:4444/') +
          data.image_url
      )
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <Logo />
          {isAuth ? (
            <div className={styles['user-panel']}>
              <button className={styles.exit} onClick={onLogout}>
                Выйти
              </button>
              <div
                className={styles['avatar-wrapper']}
                onClick={avatarClickHandler}
              >
                <Avatar image={avatar} />
              </div>
              <input ref={fileRef} type='file' onChange={onFileChange} hidden />
            </div>
          ) : (
            <div>
              <NavLink className={styles.auth} to='/register'>
                Регистрация
              </NavLink>
              <NavLink className={styles.auth} to='/login'>
                Войти
              </NavLink>
            </div>
          )}
        </div>
      </Container>
    </header>
  )
}

export default Header
