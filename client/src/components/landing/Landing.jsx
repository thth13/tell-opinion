import React from "react"
import c from "classnames"
import { Link, Navigate } from "react-router-dom"
import { connect } from "react-redux"
import styles from "./styles.module.css"
import AppBar from "./../appbar/AppBar"
import image from "../../img/people.gif"

let Landing = ({ auth }) => {
  if (auth.isAuthenticated) {
    return <Navigate to={`/${auth.user.login}`} />
  }

  return !auth.loading && (
    <div className={styles.body}>
      <AppBar/>
      <main className={styles.container}>
        <div className={styles.authBox}>
          <h1 className={styles.mainTitle}>
            <span className={styles.mainTitleAccent}>Find out,</span><br/>
            what others<br/>
            think of you
          </h1>
          <p className={styles.descriptionNarrow}>
            Sign up and get anonymous<br/>
            opinion about yourself
          </p>
          <Link to={`/login`}>
            <button className={styles.startButton}>Start</button>
          </Link>
          <div className={styles.social}>
            <button className={c(styles.socialBtn, styles.twitter)}></button>
            <button className={c(styles.socialBtn, styles.instagram)}></button>
          </div>
          <div className={styles.authorizationBox}>
            <Link to={`/login`}>
              <button className={styles.signIn}>Sign in</button>
            </Link>
            <Link to={`/register`}>  
              <button className={styles.signUp}>Sign up</button>
            </Link>
          </div>
        </div>
        <div className={styles.descriptionBox}>
          <p className={styles.description}>
            Sign up<br/>
            and get anonymous<br/>
            opinion about yourself
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
