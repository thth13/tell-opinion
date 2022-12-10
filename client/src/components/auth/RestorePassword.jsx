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
import { restorePassword } from '../../actions/auth'
import api from '../../utils/api'

const schema = yup.object({
  email: yup.string().email().required()
}).required();

const RestorePassword = ({ auth: { isRestorePassword }, restorePassword, serverErrors }) => {
  const {register, handleSubmit, formState: { errors: clientErrors }} = useForm({
    resolver: yupResolver(schema)
  });
  const [errors, setErrors] = useState({});

  const onSubmit = (data) => {
    restorePassword(data);
  };

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
              Restore password
            </h2>
            <input
              className={c(styles.fields, { [styles.error]: errors.email })}
              placeholder="Email address"
              size="40"
              {...register("email")}
            />
            {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
            <input type={'submit'} className={c(styles.button, styles.sendButton, styles.buttonMarginBottom)} value="Restore password"/>
            <span className={styles.haveAccount}>Or 
              <Link to="/register"> Sign Up</Link>
            </span>
          </form>
        ) : (
          <h2 className={styles.emailSended}>We have sent a message to your email to reset your password.</h2>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  serverErrors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, {restorePassword})(RestorePassword);
