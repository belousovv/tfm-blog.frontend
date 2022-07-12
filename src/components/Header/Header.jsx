import React from 'react'
import styles from './Header.module.scss'
import Container from '../Container/Container'
import Logo from '../Logo/Logo'
import Button from '../Button/Button'
import Avatar from '../Avatar/Avatar'
import avatar from '../../images/neznaika.jpg'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/slices/auth-selector'
import { logout } from '../../redux/slices/auth-slice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  const onLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout())
    }
  }

  const onNewPost = () => {
    navigate('/post-edit')
  }

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <Logo />
          <div className={styles['btn-wrapper']}>
            <Button
              text='Новый пост'
              isDisabled={!isAuth}
              clickHandler={onNewPost}
            />
          </div>
          {isAuth ? (
            <div className={styles['user-panel']}>
              <button className={styles.exit} onClick={onLogout}>
                Выйти
              </button>
              <Avatar image={avatar} />
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
