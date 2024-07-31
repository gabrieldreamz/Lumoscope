import { useFormikContext } from 'formik';
import { Button, ButtonProps } from '../Button';



type disabledProps = 'dirty' | 'isValid' | 'both';

interface SubmitProps extends Omit<ButtonProps, 'onPress'> {
  validation?: disabledProps;
}

export default function Submit({
  text,
  validation,
  ...props
}: SubmitProps): JSX.Element | null {
  const { handleSubmit, isValid, dirty } = useFormikContext();

  const validateBtn = () => {
    switch (validation) {
      case 'isValid': {
        return !isValid;
      }
      case 'dirty': {
        return !dirty;
      }
      case 'both': {
        return !(dirty && isValid);
      }
      default: {
        return false;
      }
    }
  };

  return (
    <Button
      text={text}
      disabled={validateBtn()}
      {...props}
      onPress={() => handleSubmit()}
    />
  );
}
