import React, { useEffect } from 'react'
import styles from './Login.module.scss'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, fetchLogin } from '../../redux/slices/auth-slice'
import {
  selectAuthError,
  selectIsAuth,
  selectIsAuthError,
} from '../../redux/slices/auth-selector'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)
  const isAuthError = useSelector(selectIsAuthError)
  const authError = useSelector(selectAuthError)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    return () => dispatch(clearError())
  }, [dispatch])

  const onSubmit = (data) => {
    dispatch(fetchLogin(data))
  }

  if (isAuth) {
    navigate('/')
  }

  return (
    <section className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Авторизация</h2>
        <input
          className={styles.input}
          type='email'
          placeholder='Почта'
          autoComplete='off'
          {...register('email', { required: 'Введите почту' })}
        />
        {errors.email && (
          <div className={styles.error}>{errors.email.message || 'ошибка'}</div>
        )}
        <input
          className={styles.input}
          placeholder='Пароль'
          autoComplete='off'
          type='password'
          {...register('password', { required: 'Введите пароль' })}
        />
        {errors.password && (
          <div className={styles.error}>
            {errors.password.message || 'Ошибка'}
          </div>
        )}
        {isValid && isAuthError && (
          <div className={styles.error}>{authError}</div>
        )}
        <Button
          className={styles.btn}
          type='submit'
          text='Войти'
          isDisabled={!isValid}
        />
      </form>
    </section>
  )
}

export default Login
