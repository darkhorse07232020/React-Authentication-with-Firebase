import React, { useContext } from 'react';
import { AuthContext } from 'providers/AuthProvider';
import CustomSelect from 'components/CustomSelect';
import CustomInput from 'components/Input/custom-input';

const DropDownOption = [
  { value: 'first', label: 'First Item' },
  { value: 'second', label: 'Second Item' },
  { value: 'third', label: 'Third Item' },
  { value: 'fourth', label: 'Forth Item' },
];

export default function FirstStep() {
  const authContext = useContext(AuthContext);
  const goalChange = (value: any) => {
    authContext.setProfile((prevProfile: ProfileInfo) => ({ ...prevProfile, goal: value.value }));
  };
  const caloriesChange = (event: any) => {
    authContext.setProfile((prevProfile: ProfileInfo) => ({ ...prevProfile, calories: event.target.value }));
  };
  const typeChange = (value: any) => {
    authContext.setProfile((prevProfile: ProfileInfo) => ({ ...prevProfile, type: value.value }));
  };
  return (
    <div className="space-y-5">
      <CustomSelect name="goal" dropDownOption={DropDownOption} isSearchable onChange={goalChange} />
      <CustomInput name="calories" type="text" label="Calories" onChange={caloriesChange} />
      <CustomSelect name="type" dropDownOption={DropDownOption} isSearchable onChange={typeChange} />
    </div>
  );
}
