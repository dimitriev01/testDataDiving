import { Formik, Form, Field, ErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { useCreateUserMutation, } from 'src/entities/user';
import { useAppSelector } from 'src/shared/lib/hooks';
import { Button } from 'src/shared/ui/button';

export const UserForm = () => {
  const [createUser] = useCreateUserMutation();
  const { users } = useAppSelector((state) => state.userReducer)

  const checkUserEmailUnique = (email: string) => {
    return users?.find((user) => user.email === email)
  }

  return (
    <Formik
      initialValues={{
        avatar: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        about: '',
      }}
      validationSchema={Yup.object({
        avatar: Yup.string().required('Avatar is required'),
        firstName: Yup.string().required('First name is required'),
        middleName: Yup.string().required('Middle name is required'),
        lastName: Yup.string(),
        email: Yup.string()
          .email('Invalid email')
          .required('Email is required')
          .test('unique-email', 'Email already exists', (value) =>
            !checkUserEmailUnique(value)
          ),
        about: Yup.string(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        createUser({
          ...values,
          id: uuidv4(),
          creationDate: new Date()
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="flex flex-col">
            <Field type="file" name="avatar" placeholder="Avatar" className="p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="avatar" component="div" className="text-red-500" />
          </div>

          <div className="flex flex-col">
            <Field type="text" name="firstName" placeholder="First name" className="p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="firstName" component="div" className="text-red-500" />
          </div>

          <div className="flex flex-col">
            <Field type="text" name="middleName" placeholder="Middle name" className="p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="middleName" component="div" className="text-red-500" />
          </div>

          <div className="flex flex-col">
            <Field type="text" name="lastName" placeholder="Last name" className="p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="lastName" component="div" className="text-red-500" />
          </div>

          <div className="flex flex-col">
            <Field type="email" name="email" placeholder="E-mail" className="p-2 border border-gray-300 rounded-md" />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>

          <div className="flex flex-col">
            <Field
              id="about"
              name="about"
              placeholder="About"
              as="textarea"
              rows={4}
              className="p-2 border border-gray-300 rounded-md resize-none" />
            <ErrorMessage name="about" component="div" className="text-red-500" />
          </div>

          <Button type="submit" isDisalbed={isSubmitting} onClick={() => undefined}>
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};
