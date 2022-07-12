import instance from './api'

export const postsApi = {
  fetchPosts: () => {
    return instance.get('/posts').then((res) => res.data)
  },
  createPost: (data) => {
    return instance.post('/posts', data).then((res) => res.data)
  },
  removePost: (postId) => {
    return instance.delete(`/posts/${postId}`).then((res) => res.data)
  },
  fetchOnePost: (postId) => {
    return instance.get(`/posts/${postId}`).then((res) => res.data)
  },
}
