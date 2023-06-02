import Link from 'next/link';
import Steps, { step } from './Steps';
import { useForm } from 'react-hook-form';
import { UserService } from '@/services/user.service';
import { useAppDispatch } from '@/redux/hook';
import { setCurrentUser } from '@/redux/user/user.slice';
import { useRouter } from 'next/router';
import { getCookie } from '@/services/cookie';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
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
    const response = await UserService.register(data);
    if (response.statusCode > 210) {
      setError('root.serverError', {
        type: response.statusCode,
        message: response.message,
      });
    } else {
      dispatch(
        setCurrentUser({
          token: response.data.token,
          user: { username: response.data.username, email: response.data.email },
        }),
      );

      router.replace('/payment');
    }
  };

  return (
    <>
      <Steps currentStep={step.register} />
      <section className="form">
        <div className="container_small">
          <form className="form__content" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form__title">Create account</h2>
            <span className="form__description">
              You need to enter your name and email. We will send you a temporary password by email
            </span>
            <div className="form__inputs">
              <input
                {...register('username', {
                  required: true,
                })}
                type="text"
                name="username"
                className="form__input"
                placeholder="Username"
              />
              <input
                type="email"
                {...register('email', {
                  required: true,
                })}
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
              Send password
            </button>

            <span className="form__already-reg">
              Have an account?
              <Link className="form__login" href="/login">
                Go to the next step
              </Link>
            </span>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
