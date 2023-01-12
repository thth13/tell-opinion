import React, { useState, useEffect } from "react"
import c from 'classnames'
import * as yup from "yup"
import { Link, Navigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import styles from "./styles.module.css"
import logo from "../../img/logo.svg"
import { resetPassword } from '../../actions/auth'
import { connect } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

const schema = yup.object({
  password: yup.string().required('Password is required').min(1),
  confirmPassword: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
}).required()

const NewPassword = ({ resetPassword, auth, serverErrors }) => {
  const navigate = useNavigate()
  const { token } = useParams()

  const [errors, setErrors] = useState({})

  const {register, handleSubmit, formState: { errors: clientErrors }} = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    resetPassword(data, token, navigate)
  }
  console.log(errors)
  useEffect(() => (
    setErrors({ ...serverErrors.errors, ...clientErrors})
  ), [clientErrors, serverErrors])

  if (auth.isAuthenticated && auth.user) {
    return <Navigate to={`/${auth.user.login}`} />
  }

  return (
    <div className={c(styles.container, styles.registerContainer)}>
      <div className={styles.root}>
        <Link to={`/`}>
          <img className={styles.logo} src={logo} alt="Logo of Tell Opinion" />
        </Link>        
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.headText}>
            New password
          </h2>
        <input
          className={c(styles.fields, {[styles.error]: errors.password })}
          placeholder="New password"
          type="password"
          {...register("password")}
        />
        {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
        <input
          className={c(styles.fields, {[styles.error]: errors.confirmPassword })}
          name="confirmPassword"
          placeholder="Confirm new password"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword.message}</span>}
        {errors.message && <span className={styles.errorText}>{errors.message}</span>}
        <button className={c(styles.button, styles.sendButton, styles.buttonMarginBottom)}>Change password</button>
        <span className={styles.haveAccount}>
          Already have an account?<br/>
          <Link to="/login">Sign In</Link>
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
