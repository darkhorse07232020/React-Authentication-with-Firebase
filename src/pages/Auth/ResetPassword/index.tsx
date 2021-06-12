import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import firebase from 'firebase';
import { emailChecker, emailValidation } from 'services/validations';

import { toast } from 'react-toast';
import ReactLoading from 'react-loading';

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (data: UserInfo) => {
    setIsSending(true);
    try {
      await firebase.auth().sendPasswordResetEmail(data.email);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setIsSending(false);
      toast.success('An email has been sent to you!');
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      toast.warn(error.message);
      setIsSending(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-600">Reset your password</h2>

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
            <div className="text-sm">
              <span>Back to</span>
              <Link to="/auth/login" className="ml-1 text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </div>

            <div className="md:col-span-2">
              <Button disabled={isSending} className="w-full">
                {isSending ? <ReactLoading type="bars" width={20} height={20} /> : <span>Send me a reset link</span>}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
