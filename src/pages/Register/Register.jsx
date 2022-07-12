import React, { useEffect } from 'react'
import styles from './Register.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  selectAuthError,
  selectIsAuth,
  selectIsAuthError,
} from '../../redux/slices/auth-selector'
import Button from '../../components/Button/Button'
import { clearError, fetchRegister } from '../../redux/slices/auth-slice'

const Register = () => {
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
    dispatch(fetchRegister(data))
  }

  if (isAuth) {
    navigate('/')
  }

  return (
    <section className={styles.register}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Регистрация</h2>
        <input
          className={styles.input}
          placeholder='Имя'
          autoComplete='off'
          {...register('name', {
            required: 'Введите имя',
            minLength: {
              value: 3,
              message: 'Имя должно быть не менее 3 символов',
            },
          })}
        />
        {errors.name && (
          <div className={styles.error}>{errors.name.message || 'Ошибка'}</div>
        )}

        <input
          className={styles.input}
          placeholder='Почта'
          autoComplete='off'
          type='email'
          {...register('email', { required: 'Введите почту' })}
        />
        {errors.email && (
          <div className={styles.error}>{errors.email.message || 'Ошибка'}</div>
        )}

        <input
          className={styles.input}
          placeholder='Пароль'
          autoComplete='off'
          type='password'
          {...register('password', {
            required: 'Введите пароль',
            minLength: {
              value: 5,
              message: 'Пароль должен быть не менее 5 символов',
            },
          })}
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
          text='Зарегистрироваться'
          isDisabled={!isValid}
        />
      </form>
    </section>
  )
}

export default Register
