import { Formik, Form, Field, ErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { useCreateUserMutation, useGetUsersQuery } from 'src/entities/user';
import { Modal } from 'src/shared/ui/modal';

export const UserForm = () => {
  const [createUser] = useCreateUserMutation();
  const { data: users } = useGetUsersQuery();

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
        <>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Users creation form
          </h1>
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

            <button type="submit" disabled={isSubmitting} className="p-2 bg-blue-500 text-white rounded-md">
              Create
            </button>
          </Form>
          <Modal title={'b'}>a</Modal>
        </>
      )}
    </Formik>
  );
};
