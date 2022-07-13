import React, { useEffect } from "react"
import c from "classnames"
import styles from "./styles.module.css"
import logo from "../../img/logo.svg"
import { connect } from "react-redux"
import { getCurrentProfile } from "../../actions/profile"
import { useState } from "react"
import { Link } from "react-router-dom"
import { logoutsUser } from "../../actions/auth"

let AppBar = ({user, profile, getCurrentProfile, logoutsUser}) => {
  let [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user && !profile) {
      getCurrentProfile()
    }
  }, [user, profile])
  
  let toggleMenu = () => {
    if (!isMenuOpen) setIsMenuOpen(true)
    else setIsMenuOpen(false)
  }

  return (
    <div>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="Logo of Tell Opinion" />
        <div className={styles.navContainer}>
          <button className={styles.searchButton}></button>
          <button className={c(styles.menuButton, {[styles.menuButtonActive]: isMenuOpen})} onClick={toggleMenu}>
            <div className={styles.name}>
              {profile && profile.name}
            </div>
            <button className={styles.arrowButton}></button>
            <div className={styles.avatarWrapper}>
              <img src={`avatars/${profile && profile.avatar}`} alt="" className={styles.avatar} />
            </div>
          </button>
          <nav className={styles.menu}>
            <ul>
              <li className={styles.menuItem}>
                <Link to="/search">Settings</Link>
              </li>
              <li className={styles.menuItem} >
                <button className={styles.logout} onClick={logoutsUser}>Logout</button> 
              </li>
            </ul>
          </nav>          
        </div>
      </div>
    </div>
  )
}

let mapStateToProps = state => ({
  user: state.auth.user,
  profile: state.profile.profile
})
 
export default connect(mapStateToProps, {getCurrentProfile, logoutsUser})(AppBar)