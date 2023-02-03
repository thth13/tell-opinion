import React, { useState, useEffect } from 'react'
import c from 'classnames'
import { GoogleLogin } from '@leecheuk/react-google-login'
import * as yup from "yup"
import { Link, Navigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import styles from './styles.module.css'
import {useTranslation} from 'react-i18next'
import { gapi } from 'gapi-script'
// import google from './../../img/googlel.svg'
// import instagram from './../../img/instagram.svg'
import logo from "../../img/logo.svg"
import { loginUser, googleLoginUser } from '../../actions/auth'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required()
const clientId = '853830546263-7jh0en2tn5i292pfg7l0a3v8hodjmr1s.apps.googleusercontent.com'

const Login = ({ loginUser, googleLoginUser, serverErrors, auth }) => {
  const {t} = useTranslation()
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const initClient = () => {
        gapi.auth2.init({
            clientId,
            scope: ''
        })
    }
    gapi.load('client:auth2', initClient)
  })

  const {register, handleSubmit, formState: { errors: clientErrors }} = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    loginUser(data)
  }

  const googleResponse = async (response) => {
    if (response.tokenId) {
      googleLoginUser(response.tokenId)
    }
  }

  const onFailure = error => {
    console.log(error)
  }

  useEffect(() => (
    // TODO: Clear errors after resubmit
    setErrors({ ...serverErrors.errors, ...clientErrors})
  ), [clientErrors, serverErrors])

  if (auth.isAuthenticated && auth.user) {
    return <Navigate to={`/${auth.user.login}`} />
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Sign in | Tell Opinion</title>
      </Helmet>
      <div className={styles.root}>
        <Link to={`/`}>
          <img className={styles.logo} src={logo} alt="Logo of Tell Opinion" />
        </Link>        
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.headText}>
            {t('signUpAndGetOpinion')}
          </h2>
          <input
            className={c(styles.fields, { [styles.error]: errors.email })}
            placeholder={t('emailPlaceholder')}
            size="40"
            {...register("email")}
          />
          {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
          <input
            className={c(styles.fields, { [styles.error]: errors.password })}
            placeholder={t('passwordPlaceholder')}
            type="password"
            {...register("password")}
          />
          {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
          <div className={styles.forgotPassword}>
            <Link to="/restorepassword">{t('forgotPassword')}</Link>
          </div>
          <button type={'submit'} className={c(styles.button, styles.sendButton)}>{t('signIn')}</button>
          {/* <button type={'submit'} className={c(styles.button, styles.viaGoogle)}>Sign in via Google</button> */}
          <GoogleLogin
            clientId={clientId}
            render={renderProps => (
              <button
                onClick={renderProps.onClick}
                className={c(styles.button, styles.viaGoogle)}
              >
                {t('signInWithGoogle')}
              </button>
            )}
            onSuccess={googleResponse}
            onFailute={onFailure}
          />
          <span className={styles.haveAccount}>{t('dontHaveAnAccout')}<br/> 
          <Link to="/register">{t('signUp')}</Link></span>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  serverErrors: state.errors
})

export default connect(mapStateToProps, { loginUser, googleLoginUser })(Login)