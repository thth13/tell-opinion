import React, { useState, useEffect } from "react";
import c from 'classnames';
import * as yup from "yup";
import { Link, Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styles from "./styles.module.css";
import logo from "../../img/logo.svg";
import { registerUser } from '../../actions/auth';
import { connect } from 'react-redux';

const schema = yup.object({
  login: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required('Password is required').min(1),
  confirmPassword: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
}).required();

const Register = ({ registerUser, auth, serverErrors }) => {
  const [errors, setErrors] = useState({})

  const {register, handleSubmit, formState: { errors: clientErrors }} = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    registerUser(data)
  }

  useEffect(() => (
    setErrors({ ...serverErrors.errors, ...clientErrors})
  ), [clientErrors, serverErrors])

  if (auth.isAuthenticated && auth.user) {
    return <Navigate to={`/@${auth.user.login}`} />
  }

  return (
    <div className={c(styles.container, styles.registerContainer)}>
      <div className={styles.root}>
        <img className={styles.logo}  src={logo} alt="" />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.headText}>
            Регистрируйся<br/>
            и получай анонимные мнения о себе
          </h2>
          <input
          className={c(styles.fields, {[styles.error]: errors.login })}
          placeholder="Login"
          size="40"
          {...register("login")}
        />
        {errors.login && <span className={styles.errorText}>{errors.login.message}</span>}
        <input
          className={c(styles.fields, {[styles.error]: errors.email })}
          placeholder="Email address"
          size="40"
          {...register("email")}
        />
        {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
        <input
          className={c(styles.fields, {[styles.error]: errors.password })}
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
        <input
          className={c(styles.fields, {[styles.error]: errors.confirmPassword })}
          name="confirmPassword"
          placeholder="Confirm password"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword.message}</span>}
        <button className={c(styles.button, styles.sendButton, styles.buttonMarginBottom)}>Register</button>
        <span className={styles.haveAccount}>
          Already have an account?<br/>
          <Link to="/login">Sign In</Link>
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
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  serverErrors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);
