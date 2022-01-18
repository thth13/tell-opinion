import React, { useState, useEffect } from 'react';
import c from 'classnames';
import * as yup from "yup";
import { Link, Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css'
import google from './../../img/googlel.svg'
import instagram from './../../img/instagram.svg';
import { loginUser } from '../../actions/auth';
import { connect } from 'react-redux';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

const Login = ({ loginUser, serverErrors, isAuthenticated }) => {
  const [errors, setErrors] = useState({})

  const {register, handleSubmit, formState: { errors: clientErrors }} = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    loginUser(data)
  };

  useEffect(() => (
    // TODO: Clear errors after resubmit
    setErrors({ ...serverErrors.errors, ...clientErrors})
  ), [clientErrors, serverErrors])

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.headText}>Sign In</h2> 
        <input
          className={c(styles.fields, { [styles.error]: errors.email })}
          placeholder="Email address"
          size="40"
          {...register("email")}
        />
        {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
        <input
          className={c(styles.fields, { [styles.error]: errors.password })}
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
        <div className={styles.forgotPassword}>
          <Link to="/restorepassword">Forgot password?</Link>
        </div>
        <button type={'submit'} className={styles.sendButton}>Login</button>
        <span className={styles.or}>or</span>
        <div className={styles.socialButtons}>
          <button className={styles.socialButton}>
            <img src={google} alt="google" />
          </button>
          <button className={styles.socialButton}>
            <img src={instagram} alt="instagram" />
          </button>
        </div>
        <span className={styles.haveAccount}>Dont have an account? <Link to="/register">Sign Up</Link></span>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  serverErrors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
