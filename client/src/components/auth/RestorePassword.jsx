import React, { useState, useEffect } from 'react'
import c from 'classnames'
import * as yup from "yup"
import { Link, Navigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import styles from './styles.module.css'
import logo from "../../img/logo.svg"
import { loginUser } from '../../actions/auth'
import { connect } from 'react-redux'
import { restorePassword } from '../../actions/auth'

const schema = yup.object({
  email: yup.string().email().required()
}).required()

const RestorePassword = ({ auth: { isRestorePassword }, restorePassword, serverErrors }) => {
  const {t} = useTranslation()
  const {register, handleSubmit, formState: { errors: clientErrors }} = useForm({
    resolver: yupResolver(schema)
  })
  const [errors, setErrors] = useState({})

  const onSubmit = (data) => {
    restorePassword(data)
  }

  useEffect(() => (
    setErrors({ ...serverErrors.errors, ...clientErrors })
  ), [clientErrors, serverErrors])

  return (
    <div className={styles.container}>
      <div className={styles.root}>
        <Link to={`/`}>
          <img className={styles.logo} src={logo} alt="Logo of Tell Opinion" />
        </Link>
        {!isRestorePassword ? (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.headText}>
              {t('restorePassword')}
            </h2>
            <input
              className={c(styles.fields, { [styles.error]: errors.email })}
              placeholder={t('emailPlaceholder')}
              size="40"
              {...register("email")}
            />
            {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
            <button
              type={'submit'}
              className={c(styles.button, styles.sendButton)}
            >
                {t('restorePassword')}
              </button>
            <span className={styles.haveAccount}>{t('or')} 
              <Link to="/register"> {t('signUp')}</Link>
            </span>
          </form>
        ) : (
          <h2 className={styles.emailSended}>{t('weHaveSentMessage')}</h2>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  serverErrors: state.errors,
  auth: state.auth
})

export default connect(mapStateToProps, {restorePassword})(RestorePassword)
