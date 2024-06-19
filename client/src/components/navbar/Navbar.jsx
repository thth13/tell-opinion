import React from 'react'
import styles from './styles.module.css'
import homeIcon from '../../img/homenav.svg'
import mailIcon from '../../img/mailnav.svg'
import searchIcon from '../../img/searchnav.svg'
import noAvatar from "../../img/noAvatar.png"

const Navbar = ({avatar}) => {
  return (
    <div className={styles.root}>
      <button className={styles.button}>
        <img src={homeIcon} className={styles.icon} />
      </button>
      <button className={styles.button}>
        <img src={mailIcon} className={styles.icon} />
      </button>
      <button className={styles.button}>
        <img src={searchIcon} className={styles.icon} />
      </button>
      <button className={styles.button}>
        <img
          src={avatar ? `https://spaces.tell-opinion.com/${avatar}` : noAvatar}
          className={styles.avatar} />
      </button>
    </div>
  )
}

export default Navbar