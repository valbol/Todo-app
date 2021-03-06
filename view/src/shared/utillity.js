import React from 'react';

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, rules) => {
  console.log('[checkValidity]', value, rules);
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isPhone) {
    const pattern = /^((\+|00)?972-?|0)(([23489]|[57]\d)-?\d{7})$/;
    isValid = pattern.test(value) && isValid;
  }
  console.log(isValid);
  return isValid;
};

export const authMiddleWare = history => {
  const authToken = localStorage.getItem('AuthToken');
  const date = new Date();
  console.log('[authMiddleWare]', authToken + ' ' + date);
  if (authToken === null) {
    history.push('/login');
  }
};

export const errorPage = () => {
  return (
    <div>
      <h1>Ooops! Page not found! </h1>
    </div>
  );
};
