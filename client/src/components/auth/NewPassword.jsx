import React, { useState, useEffect } from 'react'
import c from 'classnames'
import * as yup from 'yup'
import { Link, Navigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import styles from './styles.module.css'
import {useTranslation} from 'react-i18next'
import logo from '../../img/logo.svg'
import { resetPassword } from '../../actions/auth'
import { connect } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

const schema = yup.object({
  password: yup.string().required('Password is required').min(1),
  confirmPassword: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
}).required()

const NewPassword = ({ resetPassword, auth, serverErrors }) => {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const { token } = useParams()

  const [errors, setErrors] = useState({})

  const {register, handleSubmit, formState: { errors: clientErrors }} = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    resetPassword(data, token, navigate)
  }

  useEffect(() => (
    setErrors({ ...serverErrors.errors, ...clientErrors})
  ), [clientErrors, serverErrors])

  if (auth.isAuthenticated && auth.user) {
    return <Navigate to={`/${auth.user.login}`} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.root}>
        <Link to={`/`}>
          <img className={styles.logo} src={logo} alt='Logo of Tell Opinion' />
        </Link>        
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.headText}>
            {t('newPasswordPlaceholder')}
          </h2>
        <input
          className={c(styles.fields, {[styles.error]: errors.password })}
          placeholder={t('newPasswordPlaceholder')}
          type='password'
          {...register('password')}
        />
        {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
        <input
          className={c(styles.fields, {[styles.error]: errors.confirmPassword })}
          name='confirmPassword'
          placeholder={t('confirmNewPasswordPlaceholder')}
          type='password'
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword.message}</span>}
        {errors.message && <span className={styles.errorText}>{errors.message}</span>}
        <button className={c(styles.button, styles.sendButton, styles.buttonMarginBottom)}>
          {t('changePassword')}
        </button>
        <span className={styles.haveAccount}>
          {t('alreadyHaveAnAccount')}<br/>
          <Link to='/login'>{t('signIn')}</Link>
        </span>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  serverErrors: state.errors
})

export default connect(mapStateToProps, { resetPassword })(NewPassword)
