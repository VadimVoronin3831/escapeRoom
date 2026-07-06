import { useForm } from 'react-hook-form';
import { AuthData } from '../../types/authData';
import { AppDispatch } from '../../store/store';
import { fetchAutorize } from '../../store/apiActions/apiActions';
import { useDispatch, useSelector } from 'react-redux';
import { APP_PATH, validatePassword } from '../../const';
import { useNavigate } from 'react-router-dom';
import { getIsAuth } from '../../store/selectors/selectors';
import { useEffect } from 'react';

function AuthForm(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthorized = useSelector(getIsAuth);
  useEffect(()=>{
    if(isAuthorized){
      navigate(APP_PATH.PAGE_MAIN);
    }
  }, [isAuthorized, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>();

  const onSubmit = (data: AuthData): void => {
    dispatch(fetchAutorize(data));
  };

  const checkPassword = (value: string): string | true => {
    if (value.length < validatePassword.minLength || value.length > validatePassword.maxLength) {
      return validatePassword.LengthError;
    }

    if (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)) {
      return 'Пароль должен содержать хотя бы одну букву и одну цифру';
    }
    return true;
  };

  return (
    <form className="login-form" onSubmit={(e) => {
      handleSubmit(onSubmit)(e);
    }}
    >
      <div className="login-form__inner-wrapper">
        <h1 className="title title--size-s login-form__title">Вход</h1>
        <div className="login-form__inputs">
          <div className="custom-input login-form__input">
            <label className="custom-input__label" htmlFor="email">
              E&nbsp;&ndash;&nbsp;mail
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Укажите почту' })}
              aria-invalid={errors.email ? 'true' : 'false'}
              placeholder="Адрес электронной почты"
            />
            {errors.email && (
              <>
                <br />
                <span role="alert">{errors.email.message}</span>
              </>
            )}
          </div>

          <div className="custom-input login-form__input">
            <label className="custom-input__label" htmlFor="password">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Укажите пароль',
                validate: { checkPassword },
              })}
              aria-invalid={errors.password ? 'true' : 'false'}
              placeholder="Пароль"
            />
            {errors.password && (
              <>
                <br />
                <span role="alert">{errors.password.message}</span>
              </>
            )}
          </div>
        </div>
        <button
          className="btn btn--accent btn--general login-form__submit"
          type="submit"
        >
          Войти
        </button>
      </div>
      <label className="custom-checkbox login-form__checkbox">
        <input
          type="checkbox"
          required
        />
        <span className="custom-checkbox__icon">
          <svg width={20} height={17} aria-hidden="true">
            <use xlinkHref="#icon-tick"></use>
          </svg>
        </span>
        <span className="custom-checkbox__label">
          Я&nbsp;согласен с{' '}
          <a className="link link--active-silver link--underlined" href="#">
            правилами обработки персональных данных
          </a>
          &nbsp;и пользовательским соглашением
        </span>
      </label>
    </form>
  );
}

export default AuthForm;
