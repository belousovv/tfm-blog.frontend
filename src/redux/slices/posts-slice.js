import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../../api/api'
import { postsApi } from '../../api/posts-api'

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const data = await postsApi.fetchPosts()
  return data
})

export const fetchOnePost = createAsyncThunk(
  'posts/fetchOnePost',
  async (postId) => {
    const data = await postsApi.fetchOnePost(postId)
    return data
  }
)

export const fetchLike = createAsyncThunk(
  '/posts/fetchLike',
  async (post_id) => {
    const { data } = await instance.patch(`posts/likes/${post_id}`)
    return data
  }
)

export const fetchUnlike = createAsyncThunk(
  '/posts/fetchUnlike',
  async (post_id) => {
    const { data } = await instance.delete(`posts/likes/${post_id}`)
    return data
  }
)

export const createPost = createAsyncThunk(
  'posts/createPosts',
  async (post) => {
    const data = await postsApi.createPost(post)
    return data
  }
)

export const removePost = createAsyncThunk(
  'posts/removePost',
  async (postId) => {
    const data = await postsApi.removePost(postId)
    return data
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = []
      state.posts.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload
      state.posts.status = 'loaded'
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = 'error'
    },

    [fetchLike.fulfilled]: (state, action) => {
      state.posts.items.forEach((i, index) => {
        if (i.post_id === action.payload.post_id) {
          state.posts.items[index] = {
            ...state.posts.items[index],
            ...action.payload,
          }
        }
      })
    },
    [fetchUnlike.fulfilled]: (state, action) => {
      state.posts.items.forEach((i, index) => {
        if (i.post_id === action.payload.post_id) {
          state.posts.items[index] = {
            ...state.posts.items[index],
            ...action.payload,
          }
        }
      })
    },

    [removePost.fulfilled]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (p) => p.post_id !== action.payload.post_id
      )
    },
  },
})

export default postsSlice.reducer
