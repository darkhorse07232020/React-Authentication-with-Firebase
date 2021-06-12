import React from 'react';
import Select from 'react-select';

type Props = {
  isClearable?: boolean;
  dropDownOption: Array<any>;
  name: string;
  isSearchable?: boolean;
  isMulti?: boolean;
  className?: string;
  onChange: any;
};

export const optionToValue = (value: any[]) => value.map(item => item.value);

export default function CustomSelect({
  className,
  isClearable = false,
  isSearchable = false,
  dropDownOption,
  name,
  onChange,
  isMulti = false,
}: Props) {
  return (
    <div>
      <p className="capitalize text-sm text-gray-600 font-semibold">{name}</p>
      <Select
        className={className}
        classNamePrefix="select"
        isClearable={isClearable}
        isSearchable={isSearchable}
        isMulti={isMulti}
        name={name}
        options={dropDownOption}
        onChange={onChange}
      />
    </div>
  );
}
