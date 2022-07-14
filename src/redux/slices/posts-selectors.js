import { createSelector } from '@reduxjs/toolkit'

export const selectPosts = (state) => {
  return state.posts.posts.items
}

export const selectPostsStatus = (state) => {
  return state.posts.posts.status
}

export const selectPostsLikes = (state) => {
  return state.posts.posts.items.likes
}

export const selectPostById = (postId) =>
  createSelector(selectPosts, (posts) =>
    posts.find((p) => p.post_id === postId)
  )

export const selectTotalCount = (state) => {
  return state.posts.posts.totalCount
}

export const selectCurrentPage = (state) => {
  return state.posts.currentPage
}

export const selectPageSize = (state) => {
  return state.posts.pageSize
}
