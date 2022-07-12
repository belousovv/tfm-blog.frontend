import instance from './api'

export const authApi = {
  login: ({ email, password }) => {
    return instance
      .post('/auth/login', { email, password })
      .then((res) => res.data)
  },
  register: ({ name, email, password }) => {
    return instance
      .post('/auth/register', { name, email, password })
      .then((res) => res.data)
  },
  authMe: () => {
    return instance.get('/auth/me').then((res) => res.data)
  },
}
