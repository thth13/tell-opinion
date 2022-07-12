import React, { useEffect } from "react"
import c from "classnames"
import styles from "./styles.module.css"
import logo from "../../img/logo.svg"
import noAvatar from "../../img/noAvatar.png"
import { connect } from "react-redux"
import { getCurrentProfile } from "../../actions/profile"
import { Link } from "react-router-dom"
import { logoutsUser } from "../../actions/auth"
import { useState } from "react"

let AppBar = ({
  auth: {user}, getCurrentProfile, 
  profile, logoutsUser
}) => {
  let [isShowMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (user && !profile) {
      getCurrentProfile()
    }
  }, [user, profile])

  let showMemu = () => {
    if (isShowMenu === false) setShowMenu(true)
    else setShowMenu(false)
  }

  return (
    <div>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="Tell opinion" />
        <div className={styles.navContainer}>
          <Link to="/search"  className={styles.search}></Link>
          <button onClick={showMemu} 
            className={c(styles.dropdownButton, {[styles.dropdownButtonActive]: isShowMenu})}
          >
            <div className={styles.name}>{profile && profile.name && profile.name}</div>
            <span className={styles.arrow}></span>
            <div className={styles.avatarWrapper}>
              <img src={profile && profile.avatar 
                ? `avatars/${profile.avatar}` 
                : noAvatar} alt="" className={styles.avatar} 
              />
            </div>
          </button>
          <nav className={c(styles.memu, {[styles.memuActive]: isShowMenu})}>
            <ul>
              <li><Link to="/settings">Настройки</Link></li>
              <li onClick={logoutsUser}><span className={styles.logout}>Выход</span></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile
})

export default connect(mapStateToProps, {getCurrentProfile, logoutsUser})(AppBar)