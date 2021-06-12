import React from 'react';

type Props = {
  label?: string;
  name: string;
  type: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  onChange?: any;
};

const CustomInput = ({
  className = '',
  name,
  type,
  required = false,
  placeholder = '',
  label,
  autoComplete = '',
  onChange,
}: Props) => (
  <div className={className}>
    {label ? (
      <label htmlFor={name} className="block text-sm font-regular text-gray-500">
        {label}
      </label>
    ) : null}
    <div className="mt-1">
      <input
        tabIndex={0}
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  </div>
);
export default CustomInput;
