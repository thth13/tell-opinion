import React from "react"
import c from "classnames"
import { Link, Navigate } from "react-router-dom"
import { connect } from "react-redux"
import styles from "./styles.module.css"
import AppBar from "./../appbar/AppBar"
import image from "../../img/landingImg.svg"

let Landing = () => {
  return (
    <div className={styles.body}>
      <AppBar/>
      <main className={styles.container}>
        <div className={styles.authBox}>
          <h1 className={styles.mainTitle}>
            <span className={styles.mainTitleAccent}>Узнай,</span><br/>
            что о тебе<br/>
            думают другие
          </h1>
          <p className={styles.descriptionNarrow}>
            Регистрируйся и получай<br/> 
            анонимные мнения о себе
          </p>
          <button className={styles.startButton}>Start</button>
          <div className={styles.social}>
            <button className={c(styles.socialBtn, styles.twitter)}></button>
            <button className={c(styles.socialBtn, styles.instagram)}></button>
          </div>
          <div className={styles.authorizationBox}>
            <Link to={`/register`}>
              <button className={styles.signIn}>Sign in</button>
            </Link>
            <Link to={`/login`}>  
              <button className={styles.signUp}>Sign up</button>
            </Link>
          </div>
        </div>
        <div className={styles.descriptionBox}>
          <p className={styles.description}>
            Регистрируйся<br/>
            и получай анонимные<br/>
            мнения о себе
          </p>
          <img src={image} alt="" className={styles.image} />
        </div>
      </main>
    </div>
  )
}

export default Landing