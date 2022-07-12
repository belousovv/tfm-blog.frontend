export const selectIsAuth = (state) => {
  return Boolean(state.auth.user)
}

export const selectIsAuthError = (state) => {
  return Boolean(state.auth.status === 'error')
}

export const selectAuthError = (state) => {
  return state.auth.error
}

export const selectAuthUser = (state) => {
  return state.auth.user
}
