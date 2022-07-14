import React, { useEffect } from 'react'
import Header from './components/Header/Header'
import HeaderImage from './components/HeaderImage/HeaderImage'
import Content from './components/Content/Content'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import styles from './App.module.scss'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import { useDispatch } from 'react-redux'
import { fetchAuthMe } from './redux/slices/auth-slice'
import Register from './pages/Register/Register'
import Post from './pages/Post/Post'
import EditPost from './pages/EditPost/EditPost'
import CreatePost from './pages/CreatePost/CreatePost'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  return (
    <div className={styles.app}>
      <div className={styles['header-wrapper']}>
        <HeaderImage />
        <Header />
      </div>
      <Content>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tags/:tag' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/post-edit' element={<CreatePost />} />
          <Route path='/post-edit/:id' element={<EditPost />} />
          <Route path='/posts/:id' element={<Post />} />
        </Routes>
      </Content>
      <Footer />
    </div>
  )
}

export default App
