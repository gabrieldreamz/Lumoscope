import { TextInput } from 'react-native';
import { useFormikContext } from 'formik';
import { forwardRef } from 'react';
// import { checkPasswordStrength } from '@korensi/utils';

import FormInput, { InputProps } from './FormInput';
// import PasswordIndicator from './PasswordIndicator';

interface FormFieldKeys {
  [key: string]: string;
}

interface Props extends Omit<InputProps, 'error'> {
  name: keyof FormFieldKeys & string;
  onTextChange?: (text: string) => void;
  showPasswordIndicator?: boolean;
}

const FormField = forwardRef<TextInput, Props>(
  (
    { name, onTextChange, showPasswordIndicator, ...props }: Props,
    ref
  ): JSX.Element | null => {
    const {
      setFieldTouched,
      setFieldValue,
      errors,
      handleSubmit,
      values,
      touched,
    } = useFormikContext<FormFieldKeys>();

    return (
      <FormInput
        ref={ref}
        onChangeText={(text) => {
          setFieldValue(name, text);
          onTextChange?.(text);
        }}
        onBlur={() => {
          setFieldTouched(name);
        }}
        onSubmitEditing={() => handleSubmit()}
        error={!!(errors[name] && touched[name])}
        errorMessage={errors[name]}
        value={values[name]}
        {...props}
      // bottomComponent={
      //   showPasswordIndicator && (
      //     <PasswordIndicator
      //       passwordStrength={checkPasswordStrength(values[name] as string)}
      //     />
      //   )
      // }
      />
    );
  }
);

export default FormField;
