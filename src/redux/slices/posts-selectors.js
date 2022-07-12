export const selectPosts = (state) => {
  return state.posts.posts.items
}

export const selectPostsStatus = (state) => {
  return state.posts.status
}

export const selectPostsLikes = (state) => {
  return state.posts.items.likes
}
