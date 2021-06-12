import React, { useContext } from 'react';
import { AuthContext } from 'providers/AuthProvider';
import CustomSelect, { optionToValue } from 'components/CustomSelect';

const DropDownOption = [
  { value: 'first', label: 'First Item' },
  { value: 'second', label: 'Second Item' },
  { value: 'third', label: 'Third Item' },
  { value: 'fourth', label: 'Forth Item' },
];

export default function SecondStep() {
  const authContext = useContext(AuthContext);

  const allergiesChange = (value: any) => {
    authContext.setProfile((prevProfile: ProfileInfo) => ({ ...prevProfile, allergies: optionToValue(value) }));
  };
  const incompatibilitiesChange = (value: any) => {
    authContext.setProfile((prevProfile: ProfileInfo) => ({ ...prevProfile, incompatibilities: optionToValue(value) }));
  };
  return (
    <div className="space-y-5">
      <CustomSelect name="allergies" dropDownOption={DropDownOption} isSearchable isMulti onChange={allergiesChange} />
      <CustomSelect
        name="incompatibilities"
        dropDownOption={DropDownOption}
        isSearchable
        isMulti
        onChange={incompatibilitiesChange}
      />
    </div>
  );
}
