import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import firebase from 'firebase';
import {
  nameValidation,
  surnameValidation,
  passwordValidation,
  emailChecker,
  emailValidation,
  passwordChecker,
} from 'services/validations';
import { AuthContext } from 'providers/AuthProvider';

import { toast } from 'react-toast';
import ReactLoading from 'react-loading';

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const authContext = useContext(AuthContext);

  const password = useRef({});
  password.current = watch('password', '');

  const history = useHistory();
  const [isRegistering, setIsRegistering] = useState(false);

  const onSubmit = async (data: UserInfo) => {
    setIsRegistering(true);
    try {
      const db = firebase.firestore();
      const userCredential: firebase.auth.UserCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
      await db.collection('users').doc(userCredential.user?.uid).set({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        bodySize: data.bodySize,
        bodyWeight: data.bodyWeight,
        profileComplete: false,
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await authContext.setUser(userCredential.user);
      setIsRegistering(false);
      history.push('/profile-wizard');
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      toast.warn(error.message);
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-600">Sign up to your account</h2>

        <div className="mt-8">
          <form className="grid md:grid-cols-2 grid-cols-1 gap-5" onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="firstName"
              type="text"
              label="First Name"
              autoComplete="given-name"
              required
              register={register('firstName', {
                ...nameValidation,
                validate: (value: string) => {
                  if (!value.trim()) {
                    return 'Please enter your first name';
                  }
                  return true;
                },
              })}
              error={errors.firstName}
            />
            <Input
              name="lastName"
              type="text"
              label="Last Name"
              autoComplete="family-name"
              required
              register={register('lastName', {
                ...surnameValidation,
                validate: (value: string) => {
                  if (!value.trim()) {
                    return 'Please enter your Last name';
                  }
                  return true;
                },
              })}
              error={errors.lastName}
            />
            <Input
              name="bodySize"
              type="text"
              label="Body Size"
              autoComplete="text"
              required
              register={register('bodySize', {
                ...nameValidation,
                validate: (value: string) => {
                  if (!value.trim()) {
                    return 'Please enter your body size';
                  }
                  return true;
                },
              })}
              error={errors.bodySize}
            />
            <Input
              name="bodyWeight"
              type="text"
              label="Body Weight"
              autoComplete="text"
              required
              register={register('bodyWeight', {
                ...surnameValidation,
                validate: (value: string) => {
                  if (!value.trim()) {
                    return 'Please enter your body weight';
                  }
                  return true;
                },
              })}
              error={errors.bodyWeight}
            />
            <Input
              name="email"
              type="email"
              label="Email address"
              autoComplete="email"
              required
              register={register('email', {
                ...emailValidation,
                validate: (value: string) => {
                  if (!value.trim()) {
                    return 'Email Address is required';
                  }
                  return emailChecker(value) || 'Please enter valid email address';
                },
              })}
              error={errors.email}
              className="md:col-span-2 col-span-1"
            />
            <Input
              name="password"
              type="password"
              label="Password"
              autoComplete="password"
              required
              register={register('password', {
                ...passwordValidation,
                required: 'Please select your password',
                validate: (value: string) =>
                  passwordChecker(value) || 'Password must contain Uppercase, Lowercase, Number, Symbol',
              })}
              error={errors.password}
              className="md:col-span-2 col-span-1"
            />
            <Input
              name="confirm-password"
              type="password"
              label="Confirm password"
              autoComplete=""
              register={register('confirm-password', {
                required: 'Please confirm your password',
                validate: (value: string) => value === password.current || 'Password and Confirm password do not match',
              })}
              error={errors['confirm-password']}
              className="md:col-span-2 col-span-1"
            />

            <div className="flex items-center justify-between md:col-span-2">
              <div className="text-sm">
                <span>Do you have account?</span>
                <Link to="/auth/login" className="ml-1 text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </div>
            </div>

            <div className="md:col-span-2">
              <Button disabled={isRegistering} className="w-full">
                {isRegistering ? <ReactLoading type="bars" width={20} height={20} /> : <span>Sign up</span>}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
