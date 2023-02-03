import React, { useState, useEffect } from "react"
import c from 'classnames'
import * as yup from "yup"
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import styles from "./styles.module.css"
import logo from "../../img/logo.svg"
import {useTranslation} from 'react-i18next'
import { changePassword } from '../../actions/auth'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet";

const schema = yup.object({
  oldPassword: yup.string().required('Password is required').min(1),
  newPassword: yup.string().required('New password is required').min(1),
  confirmPassword: yup.string()
  .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
}).required()

const ChangePassword = ({ changePassword, serverErrors }) => {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})

  const {register, handleSubmit, formState: { errors: clientErrors }} = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    setErrors({});
    changePassword(data, navigate); 
  }

  useEffect(() => (
    setErrors({ ...serverErrors.errors, ...clientErrors})
  ), [clientErrors, serverErrors])

  return (
    <div className={c(styles.container, styles.registerContainer)}>
      <Helmet>
        <title>Change password | Tell Opinion</title>
      </Helmet>
      <div className={styles.root}>
        <Link to={`/`}>
          <img className={styles.logo} src={logo} alt="Logo of Tell Opinion" />
        </Link>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.headText}>{t('changePassword')}</h2>
        <input
          className={c(styles.fields, {[styles.error]: errors.oldPassword })}
          placeholder={t('oldPasswordPlaceholder')}
          type="password"
          {...register("oldPassword")}
        />
        {errors.oldPassword && <span className={styles.errorText}>{errors.oldPassword.message}</span>}
        <input
          className={c(styles.fields, {[styles.error]: errors.newPassword })}
          name="newPassword"
          placeholder={t('newPasswordPlaceholder')}
          type="password"
          {...register("newPassword")}
        />
        {errors.newPassword && <span className={styles.errorText}>{errors.newPassword.message}</span>}
        <input
          className={c(styles.fields, {[styles.error]: errors.confirmPassword })}
          name="confirmPassword"
          placeholder={t('confirmNewPasswordPlaceholder')}
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword.message}</span>}
        <button className={c(styles.button, styles.sendButton, styles.buttonMarginBottom)}>{t('changePassword')}</button>
        </form>
      </div>
    </div>

  )
}

const mapStateToProps = (state) => ({
  serverErrors: state.errors
})

export default connect(mapStateToProps, { changePassword })(ChangePassword)