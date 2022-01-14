import React, { useState, useEffect } from 'react';
import c from 'classnames';
import * as yup from "yup";
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

const Login = ({ loginUser, serverErrors }) => {
  const {register, handleSubmit, formState: { errors: clientErrors }} = useForm({
    resolver: yupResolver(schema)
  });
  const [errors, setErrors] = useState({});

  const onSubmit = (data) => {
    loginUser(data);
  };

  useEffect(() => (
    setErrors({ ...serverErrors.errors, ...clientErrors})
  ), [clientErrors, serverErrors]);

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
        {errors.password && <span className={styles.errorText}>{errors.email.message}</span>}
        <input
          className={c(styles.fields, { [styles.error]: errors.password })}
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
        <div className={styles.rememberMe}>
          <label className={styles.labelCheckbox}>
            <input className={styles.checkbox} type="checkbox" name="remember" />
            Remember me
          </label>
          <a href="/">Forgot password?</a>
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
        <span className={styles.haveAccount}>Dont have an account? <a href="/">Sign Up</a></span>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  serverErrors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
