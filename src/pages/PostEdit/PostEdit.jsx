import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './PostEdit.module.scss'
import { selectIsAuth } from '../../redux/slices/auth-selector'
import { Navigate, useNavigate } from 'react-router-dom'
import SimpleMdeReact from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import instance from '../../api/api'
import { createPost } from '../../redux/slices/posts-slice'

const PostEdit = () => {
  const fileRef = React.useRef(null)
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = React.useState('')
  const [text, setText] = React.useState('')
  const [imageUrl, setImageUrl] = React.useState(null)
  const [tags, setTags] = React.useState([''])

  const simpleMdeOptions = React.useMemo(
    () => ({
      autofocus: true,
      spellChecker: false,
      maxHeight: '400px',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  )

  const fileHandler = () => {
    fileRef.current.click()
  }

  const submitHandler = () => {
    const data = {
      title,
      text,
      tags: tags.length === 1 && tags[0] === '' ? null : tags,
      imageUrl,
    }
    dispatch(createPost(data)).then((res) => navigate('/'))
  }

  const onTextChange = React.useCallback((value) => {
    setText(value)
  }, [])
  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const onTagsChange = (e) => {
    setTags(e.target.value.split(','))
  }
  const onImageChange = async (e) => {
    try {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('image', file)
      const { data } = await instance.post('/uploads', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      setImageUrl(data.image_url)
    } catch (error) {
      console.warn(error)
    }
  }

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/' />
  }

  return (
    <section className={styles['post-edit']}>
      <div className={styles.wrapper}>
        <div className={`${styles['input-wrapper']} ${styles['img-wrapper']}`}>
          <span className={styles['input-name']}>Изображение:</span>
          <button className={styles.btn} onClick={fileHandler}>
            Выбрать
          </button>
          <input
            ref={fileRef}
            className={styles['input-file']}
            type='file'
            onChange={onImageChange}
            hidden
          />
        </div>
        <div className={styles['input-wrapper']}>
          <span className={styles['input-name']}>Заголовок:</span>
          <input
            className={styles.input}
            value={title}
            onChange={onTitleChange}
          />
        </div>
      </div>

      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:4444/${imageUrl}`}
          alt='картинка к посту'
        />
      )}

      <div className={styles['input-wrapper']}>
        <span className={styles['input-name']}>Сообщение:</span>
        <SimpleMdeReact
          className={styles.mde}
          options={simpleMdeOptions}
          onChange={onTextChange}
          value={text}
        />
      </div>
      <div className={styles['input-wrapper']}>
        <span className={styles['input-name']}>Тэги:</span>
        <input
          className={styles.input}
          placeholder='первый,второй,третий...'
          value={tags.toString()}
          onChange={onTagsChange}
        />
      </div>
      <button
        className={`${styles.btn} ${styles.submit}`}
        onClick={submitHandler}
      >
        Создать
      </button>
    </section>
  )
}

export default PostEdit
