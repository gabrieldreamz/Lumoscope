import { Formik, FormikConfig, FormikValues } from 'formik';

type FormProps<T extends FormikValues> = FormikConfig<T>;

export default function Form<Q extends FormikValues>({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: FormProps<Q>): JSX.Element {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnChange
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}
