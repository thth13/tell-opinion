import React, { useState, useEffect } from "react";
import c from 'classnames';
import styles from "./styles.module.css";
import google from "./../../img/googlel.svg";
import instagram from "./../../img/instagram.svg";
import { register } from '../../actions/auth';
import { connect } from 'react-redux';

const Register = ({ register, auth, errors: err }) => {
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
  });

  const { login, email, password, confirmPassword, errors, history } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // setFormData({...formData, errors: {email: 'Error email ))'}})
    register(formData);
  };

  // useEffect(() => {
  //   console.log(err)
  //   setFormData({ errors: err.data.errors });
  // }, [err]);

  useEffect(() => {
    if (auth.isAuisAuthenticated) {
      history.push('/')
    }
  }, [auth])

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className={styles.headText}>Sign up</h2>
        <input
          value={login}
          onChange={onChange}
          name="login"
          className={styles.fields}
          type="text"
          placeholder="Login"
          size="40"
        />
        {/* <span className={styles.error}>Login already existeds</span> */}
        <input
          value={email}
          onChange={onChange}
          className={c(styles.fields, { [styles.error]: errors.email })}
          name="email"
          type="text"
          placeholder="Email address"
          size="40"
        />
        {errors.email && <span className={styles.errorText}>лол {errors.email}</span>}
        <input
          value={password}
          onChange={onChange}
          className={styles.fields}
          name="password"
          placeholder="Password"
          type="password"
        />
        <input
          value={confirmPassword}
          onChange={onChange}
          className={styles.fields}
          name="confirmPassword"
          placeholder="Confirm password"
          type="password"
        />
        <button className={styles.sendButton}>Register</button>
        <span className={styles.or}>or</span>
        <div className={styles.socialButtons}>
          <button className={styles.socialButton}>
            <img src={google} alt="google" />
          </button>
          <button className={styles.socialButton}>
            <img src={instagram} alt="instagram" />
          </button>
        </div>
        <span className={styles.haveAccount}>
          Already have an account? <a href="#">Sign In</a>
        </span>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { register })(Register);