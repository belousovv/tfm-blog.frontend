import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentPage,
  selectPageSize,
  selectTotalCount,
} from '../../redux/slices/posts-selectors'
import { fetchChangePage } from '../../redux/slices/posts-slice'
import classNames from 'classnames/bind'
import styles from './Paginator.module.scss'
import { useParams } from 'react-router-dom'

const cx = classNames.bind(styles)

const Paginator = () => {
  const dispatch = useDispatch()
  const { tag } = useParams()

  const totalCount = useSelector(selectTotalCount)
  const pageSize = useSelector(selectPageSize)
  const currentPage = useSelector(selectCurrentPage)

  const pagesCount = Math.ceil(totalCount / pageSize)

  const onPageChange = (page) => {
    dispatch(fetchChangePage({ page, tag }))
  }

  const pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  return (
    <div className={styles.paginator}>
      {pages.map((p) => (
        <span
          key={p}
          className={cx('page', { active: p === currentPage })}
          onClick={() => onPageChange(p)}
        >
          {p}
        </span>
      ))}
    </div>
  )
}

export default Paginator
