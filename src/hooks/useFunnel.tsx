/* eslint-disable react-refresh/only-export-components */
import { Children, isValidElement, useState } from 'react';

export default function useFunnel<T extends readonly string[]>(
  steps: T,
  initialStep = steps[0]
) {
  const [step, setStep] = useState(initialStep);

  const FunnelComponent = Object.assign(
    (props: Omit<FunnelProps<T>, 'step'>) => (
      <Funnel<T> step={step} {...props} />
    ),
    { Step: (props: StepProps<T>) => <Step<T> {...props} /> }
  );

  return [FunnelComponent, setStep] as const;
}

interface StepProps<T extends readonly string[]> {
  name: T[number];
  children?: React.ReactNode;
}

const Step = <T extends readonly string[]>({ children }: StepProps<T>) => {
  return <>{children}</>;
};

interface FunnelProps<T extends readonly string[]> {
  step: T[number];
  children: React.ReactNode;
}

const Funnel = <T extends readonly string[]>({
  step,
  children,
}: FunnelProps<T>) => {
  const validChildren = Children.toArray(children).filter(isValidElement);
  const targetStep = validChildren.find(
    (child) => (child.props as StepProps<T>)?.name === step
  );

  if (!targetStep) {
    return null;
  }

  return <>{targetStep}</>;
};
