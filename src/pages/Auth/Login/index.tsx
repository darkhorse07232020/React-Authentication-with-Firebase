import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import firebase from 'firebase';
import { emailChecker, emailValidation } from 'services/validations';
import { AuthContext } from 'providers/AuthProvider';

import { toast } from 'react-toast';
import ReactLoading from 'react-loading';
import Checkbox from 'components/Checkbox';

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const db = firebase.firestore();

  const authContext = useContext(AuthContext);

  const password = useRef({});
  password.current = watch('password', '');

  const history = useHistory();
  const [isLogging, setIsLogging] = useState(false);

  const onSubmit = async (data: UserInfo) => {
    setIsLogging(true);
    try {
      const userCredential: firebase.auth.UserCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await authContext.setUser(userCredential.user);
      const profileComplete = (await db.collection('users').doc(userCredential.user?.uid).get()).data()
        ?.profileComplete;
      setIsLogging(false);
      history.push(profileComplete ? '/' : '/profile-wizard');
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      toast.warn(error.message);
      setIsLogging(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-600">Sign in to your account</h2>

        <div className="mt-8">
          <form className="grid md:grid-cols-2 grid-cols-1 gap-5" onSubmit={handleSubmit(onSubmit)}>
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
                required: 'Please select your password',
                validate: (value: string) => {
                  if (!value.trim()) {
                    return 'Please enter your password';
                  }
                  return true;
                },
              })}
              error={errors.password}
              className="md:col-span-2 col-span-1"
            />
            <Checkbox label="Remember me" name="rememberMe" register={register('rememberMe')} />
            <div className="flex items-center justify-between md:col-span-2">
              <div className="text-sm">
                <span>Don't you have account?</span>
                <Link to="/auth/register" className="ml-1 text-indigo-600 hover:text-indigo-500">
                  Sign up
                </Link>
              </div>

              <Link to="/auth/reset-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>

            <div className="md:col-span-2">
              <Button disabled={isLogging} className="w-full">
                {isLogging ? <ReactLoading type="bars" width={20} height={20} /> : <span>Sign in</span>}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
