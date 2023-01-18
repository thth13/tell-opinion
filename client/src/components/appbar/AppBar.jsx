import React, { useEffect } from "react"
import c from "classnames"
import { useNavigate } from 'react-router-dom'
import styles from "./styles.module.css"
import logo from "../../img/logo.svg"
import { connect } from "react-redux"
import { getCurrentProfile } from "../../actions/profile"
import { useState } from "react"
import { Link } from "react-router-dom"
import { logoutsUser } from "../../actions/auth"
import noAvatar from "../../img/noAvatar.png"

let AppBar = ({user, profile, 
  getCurrentProfile, logoutsUser, 
  isAuthenticated}) => {
  let [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user && !profile.name) {
      getCurrentProfile(true)
    }
  }, [user, profile])
  
  let toggleMenu = () => {
    if (!isMenuOpen) setIsMenuOpen(true)
    else setIsMenuOpen(false)
  }

  const navigate = useNavigate()

  let logout = () => {
    logoutsUser()
    navigate('/')
  }

  return (
    <div>
      <div className={styles.container}>
        <Link to={`/`}>
          <img className={styles.logo} src={logo} alt="Logo of Tell Opinion" />
        </Link>
        {isAuthenticated && <div className={styles.navContainer}>
        <Link to={`/find`}><button className={styles.searchButton}></button></Link>
          <button className={c(styles.menuButton, {[styles.menuButtonActive]: isMenuOpen})} onClick={toggleMenu}>
            <div className={styles.name}>
              {profile && profile.name}
            </div>
            <button className={styles.arrowButton}></button>
            <div className={styles.avatarWrapper}>
              <img 
                src={profile && profile.avatar ? `https://spaces.tell-opinion.com/${profile.avatar}` : noAvatar}
                alt=""
                className={styles.avatar} 
              />
            </div>
          </button>
          <nav className={styles.menu}>
            <ul>
              {/* <li className={styles.menuItem}>
                <Link to="/settings">Settings</Link>
              </li> */}
              <li className={styles.menuItem} >
                <Link to={`/editProfile`}>Edit profile</Link> 
              </li>
              <li className={styles.menuItem} >
                <button className={styles.logout} onClick={logout}>Logout</button> 
              </li>
            </ul>
          </nav>          
        </div>}
        {!isAuthenticated && <div className={styles.authorizationBox}>
        <Link to={`/register`}>
          <button className={styles.signUp}>Sign up</button>
        </Link>
        <Link to={`/login`}>  
          <button className={styles.signIn}>Sign in</button>
        </Link>
        </div>}
      </div>
    </div>
  )
}

let mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  profile: state.profile
})
 
export default connect(mapStateToProps, {getCurrentProfile, logoutsUser})(AppBar)