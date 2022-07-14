import React from 'react'
import styles from './Button.module.scss'

const Button = ({ text, clickHandler, isDisabled, type }) => {
  return (
    <button
      className={styles.btn}
      onClick={clickHandler}
      disabled={isDisabled}
      type={type}
    >
      {text}
    </button>
  )
}

export default React.memo(Button)
