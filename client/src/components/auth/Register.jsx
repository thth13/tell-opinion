import React, { useState, useEffect } from "react"
import c from 'classnames'
import * as yup from "yup"
import { Link, Navigate } from 'react-router-dom'
import { GoogleLogin } from '@leecheuk/react-google-login'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import styles from "./styles.module.css"
import logo from "../../img/logo.svg"
import { registerUser, googleLoginUser } from '../../actions/auth'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet";
import { gapi } from 'gapi-script'

const schema = yup.object({
  login: yup.string().required().notOneOf(
    [
     'register',
     'login',
     'changepassword',
     'restorepassword',
     'editprofile',
     'search',
     'find'
    ], 'Login unavailable')
    .trim('Login cannot include leading and trailing spaces')
    .test('login', 'login cannot contain a spaces', (value) => !value.includes(' ')),    
  email: yup.string().email().required(),
  password: yup.string().required('Password is required').min(1),
  confirmPassword: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
}).required()
const clientId = '853830546263-7jh0en2tn5i292pfg7l0a3v8hodjmr1s.apps.googleusercontent.com'

const Register = ({ registerUser, auth, serverErrors, googleLoginUser }) => {
  const [errors, setErrors] = useState({})
  const {t} = useTranslation()

  const {register, handleSubmit, formState: { errors: clientErrors }} = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    registerUser(data)
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
    setErrors({ ...serverErrors.errors, ...clientErrors})
  ), [clientErrors, serverErrors])

  useEffect(() => {
    const initClient = () => {
        gapi.auth2.init({
            clientId,
            scope: ''
        })
    }
    gapi.load('client:auth2', initClient)
  })

  if (auth.isAuthenticated && auth.user) {
    return <Navigate to={`/editProfile`} />
  }

  return (
    <div className={c(styles.container, styles.registerContainer)}>
      <Helmet>
        <title>Sign up | Tell Opinion</title>
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
          className={c(styles.fields, {[styles.error]: errors.login })}
          placeholder={t('loginPlaceholder')}
          size="40"
          {...register("login")}
        />
        {errors.login && <span className={styles.errorText}>{errors.login.message}</span>}
        <input
          className={c(styles.fields, {[styles.error]: errors.email })}
          placeholder={t('emailPlaceholder')}
          size="40"
          {...register("email")}
        />
        {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
        <input
          className={c(styles.fields, {[styles.error]: errors.password })}
          placeholder={t('passwordPlaceholder')}
          type="password"
          {...register("password")}
        />
        {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
        <input
          className={c(styles.fields, {[styles.error]: errors.confirmPassword })}
          name="confirmPassword"
          placeholder={t('confirmPasswordPlaceholder')}
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword.message}</span>}
        <button className={c(styles.button, styles.sendButton)}>{t('signUp')}</button>
        {/* <GoogleLogin
            clientId={clientId}
            render={renderProps => (
              <button
                onClick={renderProps.onClick}
                className={c(styles.button, styles.viaGoogle)}>
                  Sign up with Google
              </button>
            )}
            onSuccess={googleResponse}
            onFailute={onFailure}
          /> */}
        <span className={styles.haveAccount}>
          {t('alreadyHaveAnAccount')}<br/>
          <Link to="/login">{t('signIn')}</Link>
        </span>
        </form>
      </div>
    </div>
    // <div className={styles.root}>
    //   <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
    //     <h2 className={styles.headText}>Sign up</h2>
    //     <input
    //       className={c(styles.fields, {[styles.error]: errors.login })}
    //       placeholder="Login"
    //       size="40"
    //       {...register("login")}
    //     />
    //     {errors.login && <span className={styles.errorText}>{errors.login.message}</span>}
    //     <input
    //       className={c(styles.fields, {[styles.error]: errors.email })}
    //       placeholder="Email address"
    //       size="40"
    //       {...register("email")}
    //     />
    //     {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
    //     <input
    //       className={c(styles.fields, {[styles.error]: errors.password })}
    //       placeholder="Password"
    //       type="password"
    //       {...register("password")}
    //     />
    //     {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
    //     <input
    //       className={c(styles.fields, {[styles.error]: errors.confirmPassword })}
    //       name="confirmPassword"
    //       placeholder="Confirm password"
    //       type="password"
    //       {...register("confirmPassword")}
    //     />
    //     {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword.message}</span>}
    //     <button className={styles.sendButton}>Register</button>
    //     <span className={styles.or}>or</span>
    //     <div className={styles.socialButtons}>
    //       <button className={styles.socialButton}>
    //         <img src={google} alt="google" />
    //       </button>
    //       <button className={styles.socialButton}>
    //         <img src={instagram} alt="instagram" />
    //       </button>
    //     </div>
    //     <span className={styles.haveAccount}>
    //       Already have an account? <Link to="/login">Sign In</Link>
    //     </span>
    //   </form>
    // </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  serverErrors: state.errors
})

export default connect(mapStateToProps, { registerUser, googleLoginUser })(Register)
