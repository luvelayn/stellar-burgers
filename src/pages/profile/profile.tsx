import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { userSelectors } from '../../services/user/slice';
import { TUser } from '@utils-types';
import { updateUser } from '../../services/user/actions';
import { useForm } from '../../hooks/useForm';
import { TRegisterData } from '@api';

export const Profile: FC = () => {
  const user = useSelector(userSelectors.selectUser) as TUser;
  const dispatch = useDispatch();

  const { values, handleChange, resetForm } = useForm<TRegisterData>({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    resetForm({
      name: user.name,
      email: user.email,
      password: ''
    });
  }, [user]);

  const isFormChanged =
    values.name !== user?.name ||
    values.email !== user?.email ||
    !!values.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(values));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    resetForm();
  };

  return (
    <ProfileUI
      formValue={values}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleChange}
    />
  );
};
