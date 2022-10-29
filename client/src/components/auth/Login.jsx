import React, { useState, useEffect } from 'react';
import c from 'classnames';
import * as yup from "yup";
import { Link, Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css'
// import google from './../../img/googlel.svg'
// import instagram from './../../img/instagram.svg';
import logo from "../../img/logo.svg";
import { loginUser } from '../../actions/auth';
import { connect } from 'react-redux';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
}).required();

const Login = ({ loginUser, serverErrors, auth }) => {
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

  if (auth.isAuthenticated && auth.user) {
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
            Регистрируйся<br/>
            и получай анонимные мнения о себе
          </h2>
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
          <input type={'submit'} className={c(styles.button, styles.sendButton)} value="Login"/>
          <button type={'submit'} className={c(styles.button, styles.viaGoogle)}>Sign in via Google</button>
          <span className={styles.haveAccount}>Dont have an account?<br/> 
          <Link to="/register">Sign Up</Link></span>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  serverErrors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
