import React, { useEffect } from "react"
import c from "classnames"
import { useNavigate } from 'react-router-dom'
import styles from "./styles.module.css"
import logo from "../../img/logo.svg"
import { connect } from "react-redux"
import { getCurrentProfile } from "../../actions/profile"
import {useTranslation} from 'react-i18next'
import { useState } from "react"
import { Link } from "react-router-dom"
import { logoutsUser } from "../../actions/auth"
import noAvatar from "../../img/noAvatar.png"

let AppBar = ({user, profile, 
  getCurrentProfile, logoutsUser, 
  isAuthenticated}) => {
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  const {t, i18n} = useTranslation()
  const navigate = useNavigate()
  
  const toggleMenu = () => {
    if (!isMenuOpen) setIsMenuOpen(true)
    else setIsMenuOpen(false)
  }

  const logout = () => {
    logoutsUser()
    navigate('/')
  }

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.name)
    console.log(e.target.name)
  }

  useEffect(() => {
    // if (user && !profile.name) {
      getCurrentProfile(true)
    // }
  }, [])

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
                alt="avatar"
                className={styles.avatar} 
              />
            </div>
          </button>
          <nav className={styles.menu}>
            <ul>
              <li className={styles.languageSelect}>
                <button onClick={changeLanguage} name='en' className={styles.languageButton}>EN</button>
                <span> / </span>
                <button onClick={changeLanguage} name='ua' className={styles.languageButton}>UA</button>
              </li>
              <li className={styles.menuItem} >
                <Link to={`/editProfile`}>{t('editProfile')}</Link> 
              </li>
              <li className={styles.menuItem} >
                <button className={styles.logout} onClick={logout}>{t('logout')}</button> 
              </li>
            </ul>
          </nav>          
        </div>}
        {!isAuthenticated && <div className={styles.authorizationBox}>
        <Link to={`/register`}>
          <button className={styles.signUp}>{t('signUp')}</button>
        </Link>
        <Link to={`/login`}>  
          <button className={styles.signIn}>{t('signIn')}</button>
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