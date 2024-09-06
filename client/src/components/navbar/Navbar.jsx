import React from 'react'
import { connect } from "react-redux"
import { Link, useLocation } from 'react-router-dom'
import c from 'classnames'
import styles from './styles.module.css'
import homeIcon from '../../img/homenav.svg'
import mailIcon from '../../img/mailnav.svg'
import searchIcon from '../../img/searchnav.svg'
import noAvatar from '../../img/noAvatar.png'

const Navbar = ({profile, user, numberNotifications}) => {
  const location = useLocation();

  return (
    <div className={styles.root}>
      <Link 
        to={'/'}
        className={c(styles.menuItem, {[styles.selectedItem]: location.pathname === '/'})}
      >
        <button className={styles.button}>
          <img src={homeIcon} className={styles.icon} />
        </button>
      </Link>
      <Link
        to={'/notifications'}
        className={c(styles.menuItem, {[styles.selectedItem]: location.pathname === '/notifications'})}
      >
        <button className={styles.button}>
          {numberNotifications > 0 &&
            <div className={styles.numberNotifications}>{numberNotifications}</div>
          }
          <img src={mailIcon} className={styles.icon} />
        </button>
      </Link>
      <Link
        to={'/find'}
        className={c(styles.menuItem, {[styles.selectedItem]: location.pathname === '/find'})}
      >
        <button className={styles.button}>
          <img src={searchIcon} className={styles.icon} />
        </button>
      </Link>
      <Link
        to={`/${user?.login}`}
        className={c(styles.menuItem, {[styles.selectedItem]: location.pathname === `/${user?.login}`})}
      >
        <button className={styles.button}>
          <img
            src={profile?.avatar ? `https://tell-opinion-images.fra1.digitaloceanspaces.com/${profile.avatar}` : noAvatar}
            className={styles.avatar}
          />
        </button>
      </Link>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile,
  numberNotifications: state.profile.numberNotifications
})


export default connect(mapStateToProps, {})(Navbar)