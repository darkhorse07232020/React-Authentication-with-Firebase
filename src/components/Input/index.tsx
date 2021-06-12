import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

type Props = {
  label?: string;
  name: string;
  type: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  register?: any;
  error?: FieldError;
};

const Input = forwardRef(
  (
    {
      className = '',
      name,
      type,
      required = false,
      placeholder = '',
      label,
      autoComplete = '',
      register = {},
      error,
    }: Props,
    ref
  ) => {
    return (
      <div className={className}>
        {label ? (
          <label htmlFor={name} className="block text-sm font-regular text-gray-500">
            {label}
          </label>
        ) : null}
        <div className="mt-1">
          <input
            ref={ref}
            tabIndex={0}
            id={name}
            name={name}
            type={type}
            autoComplete={autoComplete}
            required={required}
            placeholder={placeholder}
            className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register}
          />
        </div>
        {error ? (
          <div className="flex-1">
            <p className="mt-1 text-xs text-red-500">{error.message}</p>
          </div>
        ) : null}
      </div>
    );
  }
);

export default Input;
