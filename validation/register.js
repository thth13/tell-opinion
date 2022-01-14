const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateRegisterForm = (data) => {
  let errors = {};

  data.login = !isEmpty(data.login) ? data.login : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

  if (!Validator.isLength(data.login, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.login)) {
    errors.login = 'Login field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }


  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 3, max: 30 })) {
    errors.password = 'Password must be at least 3 characters';
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    console.log(data.password)
    console.log(data.confirmPassword)
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};


module.exports = validateRegisterForm;