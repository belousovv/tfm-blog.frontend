import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './PostEdit.module.scss'
import { selectIsAuth } from '../../redux/slices/auth-selector'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import SimpleMdeReact from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import instance from '../../api/api'
import { createPost, updatePost } from '../../redux/slices/posts-slice'

const PostEdit = () => {
  const fileRef = React.useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)
  const { id } = useParams()

  const [title, setTitle] = React.useState('')
  const [text, setText] = React.useState('')
  const [imageUrl, setImageUrl] = React.useState(null)
  const [tags, setTags] = React.useState([''])

  const [error, setError] = React.useState('')

  useEffect(() => {
    if (id) {
      instance
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title)
          setText(data.text)
          setImageUrl(data.image_url)
          setTags(data.tags)
        })
        .catch(() => {
          console.warn('ошибка при редактировании')
        })
    }
  }, [id])

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

    //Validate data
    if (title.length < 5) {
      setError('Заголовок должен содержать более 5 символов')
      return
    }
    if (text.length < 10) {
      setError('Сообщение должно содержать более 10 символов')
      return
    }

    if (id) {
      dispatch(
        updatePost({
          id,
          data,
        })
      ).then(() => navigate('/'))
    } else {
      dispatch(createPost(data)).then(() => navigate('/'))
    }
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
      formData.append('image', file, `${new Date().toISOString()}-${file.name}`)
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
    <div className={styles['post-edit']}>
      <button
        className={`${styles.btn} ${styles.submit}`}
        onClick={submitHandler}
      >
        {id ? 'Обновить' : 'Создать'}
      </button>
      <span className={styles.error}>{error}</span>
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
          src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
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
          value={tags ? tags.toString() : ''}
          onChange={onTagsChange}
        />
      </div>
    </div>
  )
}

export default PostEdit
