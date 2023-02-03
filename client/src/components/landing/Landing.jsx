import React from "react"
import c from "classnames"
import { Link, Navigate } from "react-router-dom"
import { connect } from "react-redux"
import {useTranslation} from 'react-i18next'
import styles from "./styles.module.css"
import AppBar from "./../appbar/AppBar"
import image from "../../img/people.gif"

const Landing = ({ auth }) => {
  const {t} = useTranslation()

  if (auth.isAuthenticated) {
    return <Navigate to={`/${auth.user.login}`} />
  }

  return (
    <div className={styles.body}>
      <AppBar/>
      <main className={styles.container}>
        <div className={styles.authBox}>
          <h1 className={styles.mainTitle}>
            <span className={styles.mainTitleAccent}>{t('findOut')}</span><br/>
            <span className={styles.whatOthersThink}>{t('whatOthersThink')}</span>
          </h1>
          <p className={styles.descriptionNarrow}>
            {t('signUpAndGetOpinion')}
          </p>
          <Link to={`/login`}>
            <button className={styles.startButton}>{t('start')}</button>
          </Link>
          <div className={styles.social}>
            <button className={c(styles.socialBtn, styles.twitter)}></button>
            <button className={c(styles.socialBtn, styles.instagram)}></button>
          </div>
          <div className={styles.authorizationBox}>
            <Link to={`/login`}>
              <button className={styles.signIn}>{t('signIn')}</button>
            </Link>
            <Link to={`/register`}>  
              <button className={styles.signUp}>{t('signUp')}</button>
            </Link>
          </div>
        </div>
        <div className={styles.descriptionBox}>
          <p className={styles.description}>
            {t('signUpAndGetOpinion')}
          </p>
          <img src={image} alt="" className={styles.image} />
        </div>
      </main>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(Landing)
