const isEmpty = string => {
  if (string.trim() === '') return true;
  else return false;
};

const isEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};
const errorMessage = 'Must not be empty';

exports.validateLoginData = data => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = errorMessage;
  if (isEmpty(data.password)) errors.password = errorMessage;

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateSignUpData = data => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = errorMessage;
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be valid email address';
  }
  if (isEmpty(data.firstName)) errors.firstName = errorMessage;
  if (isEmpty(data.lastName)) errors.lastName = errorMessage;
  if (isEmpty(data.phoneNumber)) errors.phoneNumber = errorMessage;
  if (isEmpty(data.country)) errors.country = errorMessage;
  if (isEmpty(data.password)) errors.password = errorMessage;
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = 'Passowrds must be the same';
  if (isEmpty(data.username)) errors.username = errorMessage;

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
