import React, { useState, useEffect } from 'react';
import c from 'classnames';
import * as yup from "yup";
import { Link, Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css'
import logo from "../../img/logo.svg";
import { loginUser } from '../../actions/auth';
import { connect } from 'react-redux';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

const RestorePassword = ({ loginUser, serverErrors, auth }) => {
  const {register, handleSubmit, formState: { errors: clientErrors }} = useForm({
    resolver: yupResolver(schema)
  });
  const [errors, setErrors] = useState({});

  const onSubmit = (data) => {
    loginUser(data);
  };

  useEffect(() => (
    setErrors({ ...serverErrors.errors, ...clientErrors})
  ), [clientErrors, serverErrors])

  if (auth.isAuthenticated) {
    return <Navigate to={`/@${auth.user.login}`} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.root}>
        <Link to={`/`}>
          <img className={styles.logo} src={logo} alt="Logo of Tell Opinion" />
        </Link>        
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.headText}>
            Restore password
          </h2>
          <input
            className={c(styles.fields, { [styles.error]: errors.email })}
            placeholder="Email address"
            size="40"
            {...register("email")}
          />
          {errors.password && <span className={styles.errorText}>{errors.email.message}</span>}
          <input type={'submit'} className={c(styles.button, styles.sendButton, styles.buttonMarginBottom)} value="Restore password"/>
          <span className={styles.haveAccount}>Or 
            <Link to="/register"> Sign Up</Link>
          </span>
        </form>
      </div>
    </div>
    // <div className={styles.root}>
    //   <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
    //     <h2 className={styles.headText}>Restore password</h2> 
    //     <input
    //       className={c(styles.fields, { [styles.error]: errors.email })}
    //       placeholder="Email address"
    //       size="40"
    //       {...register("email")}
    //     />
    //     {errors.password && <span className={styles.errorText}>{errors.email.message}</span>}
    //     <button type={'submit'} className={styles.sendButton}>Restore password</button>
    //     <span className={styles.haveAccount}>Or <Link to="/login">Sign in</Link></span>
    //   </form>
    // </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  serverErrors: state.errors
});

export default connect(mapStateToProps, { loginUser })(RestorePassword);
