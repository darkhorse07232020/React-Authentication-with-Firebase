import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { AuthContext } from 'providers/AuthProvider';

import { toast } from 'react-toast';
import Button from 'components/Button';
import ReactLoading from 'react-loading';
import Progress from './components/progress';
import FirstStep from './components/first-step';
import SecondStep from './components/second-step';
import ThirdStep from './components/third-step';

const stepLists: StepList[] = [
  { id: '01', title: 'Define your goal' },
  { id: '02', title: 'Allergies & Incompatibilities' },
  { id: '03', title: 'Additional Information' },
];

function ProfileWizard() {
  const authContext = useContext(AuthContext);
  const db = firebase.firestore();

  const history = useHistory();
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedStep, setCompletedStep] = useState(0);

  const onSubmit = async () => {
    setIsUpdating(true);
    try {
      const profile: ProfileInfo = authContext.profile as ProfileInfo;
      const originalInfo = (await db.collection('users').doc(authContext.user?.uid).get()).data();
      await db
        .collection('users')
        .doc(authContext.user?.uid)
        .set({
          ...originalInfo,
          profileComplete: true,
          goal: profile?.goal,
          calories: profile?.calories,
          type: profile?.type,
          allergies: profile?.allergies,
          incompatibilities: profile?.incompatibilities,
          additional: profile?.additional,
        });
      setIsUpdating(false);
      history.push('/');
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      toast.warn(error.message);
      setIsUpdating(false);
    }
  };

  const selectedStep = (value: number) => {
    setCurrentStep(value);
  };

  const nextStep = () => {
    const prevStep = currentStep;
    setCurrentStep(prevStep + 1);
    setCompletedStep(prevCompleted => Math.max(prevCompleted, prevStep + 1));
  };

  return (
    <div className="container mx-auto flex flex-wrap justify-center">
      <h2 className="my-6 text-3xl font-extrabold text-gray-600">Complete your profile</h2>
      <Progress
        currentStep={currentStep}
        stepLists={stepLists}
        selectedStep={selectedStep}
        completedStep={completedStep}
      />
      <div className="w-1/2 mt-5">
        {currentStep === 0 && <FirstStep />}
        {currentStep === 1 && <SecondStep />}
        {currentStep === 2 && <ThirdStep />}
      </div>
      <div className="w-full flex justify-center mt-5">
        <Button className="w-20" onClick={currentStep === 2 ? onSubmit : nextStep}>
          {currentStep < 2 ? 'Next' : isUpdating ? <ReactLoading type="bars" width={20} height={20} /> : 'Submit'}
        </Button>
      </div>
    </div>
  );
}

export default ProfileWizard;
