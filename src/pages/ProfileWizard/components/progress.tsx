import React from 'react';
import classNames from 'classnames';

type Props = {
  currentStep: number;
  completedStep: number;
  stepLists: StepList[];
  selectedStep: any;
};

function Progress({ currentStep, stepLists, selectedStep, completedStep }: Props) {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {stepLists.map((step, stepIdx) => (
          <li key={step.title} className="md:flex-1">
            <div
              className={classNames(
                'group pl-4 py-2 flex flex-col border-l-4  md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4 cursor-pointer',
                { 'border-indigo-600 hover:border-indigo-800': stepIdx < currentStep },
                { 'border-indigo-600': stepIdx === currentStep },
                { 'border-gray-200': stepIdx > currentStep }
              )}
              onClick={() => {
                if (stepIdx > completedStep) {
                  return;
                }
                selectedStep(stepIdx);
              }}
              aria-hidden="true"
            >
              <span
                className={classNames(
                  'text-xs font-semibold tracking-wide uppercase',
                  { 'text-indigo-600 group-hover:text-indigo-800': stepIdx < currentStep },
                  { 'text-indigo-600': stepIdx === currentStep },
                  { 'text-gray-500 group-hover:text-gray-700': stepIdx > currentStep }
                )}
              >
                {step.id}
              </span>
              <span className="text-sm font-medium">{step.title}</span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Progress;
