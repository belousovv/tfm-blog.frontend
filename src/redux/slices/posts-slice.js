import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../../api/api'
import { postsApi } from '../../api/posts-api'

const initialState = {
  posts: {
    items: [],
    status: 'loading',
    totalCount: 0,
  },
  currentPage: 1,
  pageSize: 5,
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (page = 1, thunkApi) => {
    const count = thunkApi.getState().posts.pageSize
    const data = await postsApi.fetchPosts(page, count)
    return data
  }
)

export const fetchPostsByTag = createAsyncThunk(
  'posts/fetchPostsByTag',
  async ({ tag, page = 1 }, thunkApi) => {
    const count = thunkApi.getState().posts.pageSize
    const data = await postsApi.fetchPostsByTag({ tag, page, count })
    return data
  }
)

export const fetchOnePost = createAsyncThunk(
  'posts/fetchOnePost',
  async (postId) => {
    const data = await postsApi.fetchOnePost(postId)
    return data
  }
)

export const addViews = createAsyncThunk('posts/addViews', async (postId) => {
  const data = await postsApi.addViews(postId)
  return data
})

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

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (postData) => {
    const status = await postsApi.updatePost(postData.id, postData.data)
    return status
  }
)

export const fetchChangePage = createAsyncThunk(
  'posts/fetchChangePage',
  async ({ page, tag }, thunkApi) => {
    const dispatch = thunkApi.dispatch
    dispatch(tag ? fetchPostsByTag({ tag, page }) : fetchPosts(page))
    dispatch(changePage(page))
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = []
      state.posts.totalCount = 0
      state.posts.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload.posts
      state.posts.totalCount = action.payload.totalCount
      state.posts.status = 'loaded'
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = 'error'
    },

    [fetchPostsByTag.pending]: (state) => {
      state.posts.items = []
      state.posts.totalCount = 0
      state.posts.status = 'loading'
    },
    [fetchPostsByTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload.posts
      state.posts.totalCount = action.payload.totalCount
      state.posts.status = 'loaded'
    },
    [fetchPostsByTag.rejected]: (state) => {
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

    [addViews.fulfilled]: (state, action) => {
      state.posts.items.find(
        (p) => p.post_id === action.payload.post_id
      ).views = action.payload.views
    },
  },
})

export const { changePage } = postsSlice.actions

export default postsSlice.reducer
