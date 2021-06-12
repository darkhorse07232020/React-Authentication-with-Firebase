import React, { useContext } from 'react';
import { AuthContext } from 'providers/AuthProvider';
import CustomSelect, { optionToValue } from 'components/CustomSelect';

const DropDownOption = [
  { value: 'first', label: 'First Item' },
  { value: 'second', label: 'Second Item' },
  { value: 'third', label: 'Third Item' },
  { value: 'fourth', label: 'Forth Item' },
];

export default function ThirdStep() {
  const authContext = useContext(AuthContext);
  const additionalChange = (value: any) => {
    authContext.setProfile((prevProfile: ProfileInfo) => ({ ...prevProfile, additional: optionToValue(value) }));
  };
  return (
    <div className="space-y-5">
      <CustomSelect name="allergies" dropDownOption={DropDownOption} isSearchable isMulti onChange={additionalChange} />
    </div>
  );
}
