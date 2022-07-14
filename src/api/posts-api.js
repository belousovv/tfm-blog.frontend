import instance from './api'

export const postsApi = {
  fetchPosts: (page, count) => {
    return instance
      .get(`/posts?page=${page}&count=${count}`)
      .then((res) => res.data)
  },
  fetchPostsByTag: ({ tag, page, count }) => {
    return instance
      .get(`/tags/${tag}?page=${page}&count=${count}`)
      .then((res) => res.data)
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
  updatePost: (postId, data) => {
    return instance.patch(`/posts/${postId}`, data).then((res) => res.data)
  },
  addViews: (postId) => {
    return instance.post(`/posts/views/${postId}`).then((res) => res.data)
  },
}
