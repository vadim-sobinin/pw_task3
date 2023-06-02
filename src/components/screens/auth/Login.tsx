import React from 'react';
import Steps, { step } from './Steps';
import { useAppDispatch } from '@/redux/hook';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { UserService } from '@/services/user.service';
import { setCurrentUser } from '@/redux/user/user.slice';
import { getCookie } from '@/services/cookie';

type FormValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (getCookie('key')) {
    router.replace('/payment');
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    const response = await UserService.login(data);
    if (response.statusCode > 210) {
      setError('root.serverError', {
        type: response.statusCode,
        message: response.message,
      });
    } else {
      dispatch(
        setCurrentUser({
          token: response.data.token,
          user: { username: response.data.user.username, email: response.data.user.email },
        }),
      );

      router.replace('/payment');
    }
  };

  return (
    <>
      <Steps currentStep={step.login} />
      <section className="form">
        <div className="container_small">
          <form className="form__content" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form__title">Log in</h2>
            <div className="form__inputs">
              <input
                {...register('email', {
                  required: true,
                })}
                type="email"
                name="email"
                className="form__input"
                placeholder="Email"
              />
              <input
                {...register('password', {
                  required: true,
                })}
                type="password"
                name="password"
                className="form__input"
                placeholder="Password"
              />
            </div>

            {errors.root && errors.root.serverError.type && (
              <div className="form__error">{errors.root.serverError.message}!</div>
            )}

            <button className="form__btn form__btn_m48" type="submit">
              Log in
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
