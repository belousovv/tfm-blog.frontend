import React from 'react'
import styles from './Button.module.scss'

const Button = ({ text, clickHandler, isDisabled, ...props }) => {
  return (
    <button
      className={styles.btn}
      onClick={clickHandler}
      disabled={isDisabled}
      type={props.type}
    >
      {text}
    </button>
  )
}

export default Button
