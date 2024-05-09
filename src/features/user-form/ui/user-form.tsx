import { Formik, Form, Field, ErrorMessage } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { useCreateUserMutation, } from 'src/entities/user';
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { Button } from 'src/shared/ui/button';
import { Modal, changeModalCreationUser, changeModalEditionAvatar } from 'src/shared/ui/modal';
import { Dogs, dogAPIUrl, } from 'src/entities/dog';
import AvatarImg from '../assets/avatar.webp'

export const UserForm = () => {
  const [avatar, setAvatar] = useState(AvatarImg);
  const [createUser] = useCreateUserMutation();
  const modals = useAppSelector((state) => state.modalReducer)
  const { users } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch();

  const checkUserEmailUnique = (email: string) => {
    return users?.find((user) => user.email === email)
  }

  const handleAvatarSelect = useCallback((imgUrl: string) => {
    setAvatar(imgUrl);
  }, []);

  const changeVisibleModalEditionAvatar = useCallback((isOpened: boolean) => {
    dispatch(changeModalEditionAvatar(isOpened))
  }, [dispatch])

  return (
    <>
      <Formik
        initialValues={{
          avatar,
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          about: '',
        }}
        validationSchema={Yup.object({
          avatar: Yup.string(),
          firstName: Yup.string().required('First name is required'),
          middleName: Yup.string().required('Middle name is required'),
          lastName: Yup.string(),
          email: Yup.string()
            .email('Invalid email')
            .required('Email is required')
            .test('unique-email', 'Email already exists', (value) => !checkUserEmailUnique(value)
            ),
          about: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          createUser({
            ...values,
            id: uuidv4(),
            creationDate: new Date()
          }).then(() => {
            resetForm();
            dispatch(changeModalCreationUser(false));
            setSubmitting(false);
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="flex justify-center">
              <img className='cursor-pointer' src={`${dogAPIUrl}/${avatar}`} height={200} width={200} onClick={() => changeVisibleModalEditionAvatar(true)} alt="choosed avatar" />
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

            <div className="flex flex-col">
              <Button type="submit" isDisalbed={isSubmitting}>
                Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <Modal title={'Choose avatar of those dogs'} isOpened={modals.modalEditionAvatar} setShowModal={changeVisibleModalEditionAvatar}>
        <Dogs onSelect={handleAvatarSelect} />
      </Modal>
    </>
  );
};
