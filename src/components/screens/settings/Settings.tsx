import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { selectUser } from '@/redux/user/user.selectors';
import { updateUserInfo } from '@/redux/user/user.slice';
import { getCookie } from '@/services/cookie';
import { UserService } from '@/services/user.service';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export enum emode {
  info,
  password,
}

type FormValues = {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
};

const Settings = () => {
  const router = useRouter();

  if (!getCookie('key')) {
    router.replace('/');
  }

  const [mode, setMode] = useState(0);

  const { userData } = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    resetField,
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    if (userData) {
      if (!mode) {
        const response = await UserService.updateUserInfo({ token: userData.token, payload: data });
        if (response.statusCode > 210) {
          setError('root.serverError', {
            type: response.statusCode,
            message: response.message,
          });
        } else {
          dispatch(updateUserInfo(response));
          resetField('email');
          resetField('username');
        }
      } else {
        const response = await UserService.updateUserPassword({
          token: userData.token,
          payload: data,
        });
        if (response.statusCode > 210) {
          setError('root.serverError', {
            type: response.statusCode,
            message: response.message,
          });
        } else {
          resetField('currentPassword');
          resetField('newPassword');
        }
      }
    }
  };

  return (
    <section className="settings">
      <div className="container">
        <h2 className="settings__title">Settings</h2>
        <div className="settings__switch">
          <div
            onClick={() => {
              mode && resetField('currentPassword');
              mode && resetField('newPassword');
              mode && setMode(emode.info);
            }}
            className={`settings__switch-link ${!mode && 'active'}`}>
            Personal info
          </div>
          <div
            onClick={() => {
              !mode && resetField('email');
              !mode && resetField('username');
              !mode && setMode(emode.password);
            }}
            className={`settings__switch-link ${mode && 'active'}`}>
            Change password
          </div>
        </div>
        <form className="settings__form" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="settings__form-title">{mode ? 'Change password' : 'Personal Info'}</h3>
          <div className="form__inputs settings__inputs">
            {mode ? (
              <>
                <input
                  {...register('currentPassword', {
                    required: true,
                  })}
                  type="password"
                  className="form__input settings__form-input"
                  placeholder="Current password"
                />
                <input
                  {...register('newPassword', {
                    required: true,
                  })}
                  type="password"
                  className="form__input settings__form-input"
                  placeholder="New password"
                />
              </>
            ) : (
              <>
                <input
                  {...register('username', {})}
                  type="text"
                  className="form__input settings__form-input"
                  placeholder="Username"
                />
                <input
                  {...register('email', {})}
                  type="email"
                  className="form__input settings__form-input"
                  placeholder="Email"
                />
              </>
            )}
          </div>
          {errors.root && errors.root.serverError.type && (
            <div className="form__error">{errors.root.serverError.message}!</div>
          )}
          <button className="form__btn form__btn_m48 settings__form-btn">Save</button>
        </form>
      </div>
    </section>
  );
};

export default Settings;
