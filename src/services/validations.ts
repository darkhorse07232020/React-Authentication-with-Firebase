const strongPasswordRegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');

const emailRegexp = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
export const requiredValidation = 'Please fill this field';

export const nameValidation = {
  required: 'Please enter your first name',
  minLength: {
    value: 2,
    message: 'Name must have at least 2 characters',
  },
};

export const surnameValidation = {
  required: 'Please enter your last name',
  minLength: {
    value: 2,
    message: 'Surname must have at least 2 characters',
  },
};

export const emailValidation = {
  required: 'Email Address is required',
};

export const passwordValidation = {
  minLength: {
    value: 8,
    message: 'Password must have at least 8 characters',
  },
};

export const passwordChecker = (pass: string): boolean => !!strongPasswordRegExp.test(pass);

export const emailChecker = (email: string): boolean => emailRegexp.test(email);
