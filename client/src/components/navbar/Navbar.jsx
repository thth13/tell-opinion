import React from 'react'
import { connect } from "react-redux"
import styles from './styles.module.css'
import homeIcon from '../../img/homenav.svg'
import mailIcon from '../../img/mailnav.svg'
import searchIcon from '../../img/searchnav.svg'
import noAvatar from "../../img/noAvatar.png"
import { Link } from 'react-router-dom'

const Navbar = ({profile, user}) => {
  return (
    <div className={styles.root}>
      <Link to={'/'} className={styles.kek}>
        <button className={styles.button}>
          <img src={homeIcon} className={styles.icon} />
        </button>
      </Link>
      <Link to={'/notifications'}>
        <button className={styles.button}>
          <img src={mailIcon} className={styles.icon} />
        </button>
      </Link>
      <Link to={'/find'}>
        <button className={styles.button}>
          <img src={searchIcon} className={styles.icon} />
        </button>
      </Link>
      <Link to={`/${user?.login}`}>
        <button className={styles.button}>
          <img
            src={profile?.avatar ? `https://spaces.tell-opinion.com/${profile.avatar}` : noAvatar}
            className={styles.avatar}
          />
        </button>
      </Link>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile.profile,
})


export default connect(mapStateToProps, {})(Navbar)