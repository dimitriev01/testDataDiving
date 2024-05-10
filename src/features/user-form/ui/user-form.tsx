import { Formik, Form, Field, ErrorMessage, } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useChangeUserInfoMutation, useCreateUserMutation, } from 'src/entities/user';
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks';
import { Button } from 'src/shared/ui/button';
import { Modal, changeModalCreationUser, changeModalEditionAvatar, changeModalEditionUser } from 'src/shared/ui/modal';
import { Dogs, dogAPIUrl, } from 'src/entities/dog';
import { routes } from 'src/shared/lib/routes';
import AvatarImg from '../assets/avatar.webp'

const initialValues = {
  avatar: '',
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  about: '',
}

export const UserForm = () => {
  const [avatar, setAvatar] = useState('')
  const [createUser] = useCreateUserMutation();
  const [changeInfoUser] = useChangeUserInfoMutation();
  const modals = useAppSelector((state) => state.modalReducer)
  const { users, user } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isMainPage = pathname === routes.main

  const checkUserEmailUnique = (email: string) => {
    return users?.find((user) => user.email === email)
  }

  const validationSchema = Yup.object({
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
  })

  const handleAvatarSelect = useCallback((imgUrl: string) => {
    setAvatar(imgUrl)
  }, []);

  const changeVisibleModalEditionAvatar = useCallback((isOpened: boolean) => {
    dispatch(changeModalEditionAvatar(isOpened))
  }, [dispatch])

  useEffect(() => {
    if (!isMainPage && user?.avatar) {
      handleAvatarSelect(user.avatar)
    }
  }, [handleAvatarSelect, isMainPage, user?.avatar])

  // useEffect(() => {
  //   return () => {
  //     dispatch(changeModalEditionAvatar(false))
  //   }
  // }, [dispatch])

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={isMainPage ? initialValues : {
          avatar: user?.avatar || '',
          firstName: user?.firstName || '',
          middleName: user?.middleName || '',
          lastName: user?.lastName || '',
          email: user?.email || '',
          about: user?.about || ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm, }) => {
          if (isMainPage) {
            createUser({
              ...values,
              creationDate: new Date(),
              avatar,
              id: uuidv4(),
            })
              .then(() => {
                dispatch(changeModalCreationUser(false));
                resetForm();
                setSubmitting(false);
              })
              .catch((err) => console.log(err));
          } else {
            if (user) {
              changeInfoUser({
                ...values,
                creationDate: new Date(),
                avatar,
                id: user.id,
              })
                .then(() => {
                  dispatch(changeModalEditionUser(false))
                  resetForm();
                  setSubmitting(false);
                })
                .catch((err) => console.log(err));
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="flex justify-center">
              <img
                className='cursor-pointer'
                src={avatar ? `${dogAPIUrl}/${avatar}` : AvatarImg} height={200} width={200}
                onClick={() => changeVisibleModalEditionAvatar(true)}
                alt="choosed avatar"
              />
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
                className="p-2 border border-gray-300 rounded-md resize-none"
              />
              <ErrorMessage name="about" component="div" className="text-red-500" />
            </div>

            <div className="flex space-x-2">
              <Button type="submit" isDisalbed={isSubmitting}>
                {isMainPage ? 'Create' : 'Change'}
              </Button>
            </div>
          </Form>
        )}
      </Formik >
      <Modal
        title={'Choose avatar of those dogs'}
        isOpened={modals.modalEditionAvatar}
        setShowModal={changeVisibleModalEditionAvatar}
      >
        <Dogs onSelect={handleAvatarSelect} />
      </Modal>
    </>
  );
};
