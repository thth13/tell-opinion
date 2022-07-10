import React from 'react'
import c from 'classnames'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from '../../img/logo.svg'
import styles from './styles.module.css'

const Landing = ({ auth }) => {
  if (auth.isAuthenticated) {
    return <Navigate to={`/@${auth.user.login}`} />
  }

  return !auth.loading && (
    <div className={styles.body}>
      <header>
        <div className={styles.container}>
          <div className={styles.headerAuth}>
            <Link to={`/login`}>Login </Link>
              /
            <Link to={`/register`}> Register</Link>
          </div>
          <div className={styles.headerLogo}>
            <img src={logo} />
            <p>Tell Opinion</p>
          </div>
          <ul className={styles.headerSocial}>
            <li className={styles.socialTwitter}></li>
            <li className={styles.socialInstagram}></li>
          </ul>
        </div>
      </header>
      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.titleBlock}>
            <h2>Узнай что о тебе думают другие</h2>
            <span>Регестрируйся и получай анонимные мнения о себе</span>
            <div className={styles.mobileButtons}>
              <button className={styles.registerButton}>Регистрация</button>
              <button className={styles.loginButton}>Вход</button>
            </div>
            <button className={c(styles.registerButton, styles.desktopButton)}>Начать</button>
          </div>
          <div className={styles.backgroundCircles}>
            <div className={styles.circle1}></div>
            <div className={styles.circle2}></div>
            <div className={styles.circle3}></div>
          </div>
        </div>
      </section>
      {/* <Link to={`/login`}>
        Login
      </Link>
      <Link to={`/register`}>
        Register
      </Link> */}
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(Landing)
