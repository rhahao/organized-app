import { useMemo, useState } from 'react';
import ActionKeys from './action_keys';
import ActionLogin from './action_login';
import ActionMigrate from './action_migrate';

const useActionSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => setCurrentStep(prev => prev + 1)

  const handlePrevious = () => setCurrentStep(prev => prev - 1)

  const steps = useMemo(() => {
    return [
      {
        label: 'Login to your account',
        Component: <ActionLogin next={handleNext} />,
      },
      {
        label: 'Set master key and access code',
        Component: <ActionKeys previous={handlePrevious} next={handleNext} />,
      },
      {
        label: 'Migrate your data',
        Component: <ActionMigrate next={handleNext} />,
      },
    ];
  }, []);

  return { steps, currentStep };
};

export default useActionSteps;
