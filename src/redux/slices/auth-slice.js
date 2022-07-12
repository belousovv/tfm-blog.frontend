import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../api/auth-api'

const initialState = {
  user: null,
  status: 'loading',
  error: null,
}

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authApi.login(payload)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authApi.register(payload)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const data = await authApi.authMe()
  return data
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.status = 'loading'
      window.localStorage.removeItem('token')
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.user = null
      state.status = 'loading'
      state.error = null
    },
    [fetchLogin.fulfilled]: (state, action) => {
      const { token, ...userData } = action.payload
      state.user = userData
      state.status = 'loaded'
      state.error = null
      window.localStorage.setItem('token', token)
    },
    [fetchLogin.rejected]: (state, action) => {
      state.user = null
      state.status = 'error'
      state.error = action.payload.message
    },

    [fetchRegister.pending]: (state) => {
      state.user = null
      state.status = 'loading'
      state.error = null
    },
    [fetchRegister.fulfilled]: (state, action) => {
      const { token, ...userData } = action.payload
      state.user = userData
      state.status = 'loaded'
      state.error = null
      window.localStorage.setItem('token', token)
    },
    [fetchRegister.rejected]: (state, action) => {
      state.user = null
      state.status = 'error'
      state.error = action.payload.message
    },

    [fetchAuthMe.pending]: (state) => {
      state.user = null
      state.status = 'loading'
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.user = action.payload
      state.status = 'loaded'
    },
    [fetchAuthMe.rejected]: (state) => {
      state.user = null
      state.status = 'loading'
    },
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
