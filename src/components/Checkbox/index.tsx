import React, { forwardRef } from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
  label: string;
  name: string;
  register: any;
};

const Checkbox = forwardRef(({ label, name, className = '', register = {} }: Props, ref) => (
  <div className="flex items-center">
    <input
      id={name}
      name={name}
      type="checkbox"
      ref={ref}
      className={classNames('h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded', className)}
      {...register}
    />
    <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
      {label}
    </label>
  </div>
));

export default Checkbox;
