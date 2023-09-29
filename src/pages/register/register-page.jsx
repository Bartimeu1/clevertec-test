import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import './register-page.scss';
import { useRegisterUserMutation } from '../../store/register/register';

// Images
import arrow from '../../assets/images/arrow.svg';
import passClosed from '../../assets/images/passwordClosed.svg';
import passOpened from '../../assets/images/passwordOpened.svg';

// Components
import { FormInput } from '../../components/form-input/form-input';
import { Icon } from '../../components/icon/icon';
import { Modal } from '../../components/modal/modal';

export function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputFilled, setInputFilled] = useState(false);
  const [stepCounter, setStepCounter] = useState(1);
  const [errorStatus, setErrorStatus] = useState(null);
  const [successRegister, setSuccessRegister] = useState(null);

  const [registerUser] = useRegisterUserMutation();

  const onSubmit = async (data) => {
    try {
      await registerUser({ ...data }).unwrap();
      setSuccessRegister(true);
    } catch (error) {
      setSuccessRegister(false);
      setErrorStatus(error.status);
    }
  };

  const refreshRegister = () => {
    setStepCounter(1);
    setErrorStatus(null);
    setSuccessRegister(null);
    reset();
  };

  const repeatRegister = () => {
    setErrorStatus(null);
    setSuccessRegister(null);
    onSubmit();
  };
  console.log(errors);

  return (
    <div className='register'>
      {successRegister ? (
        <Modal
          title='Регистрация успешна'
          text='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
          buttonText='вход'
          navigatePath='/auth'
        />
      ) : errorStatus && errorStatus === 400 ? (
        <Modal
          title='Данные не сохранились'
          text='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail'
          buttonText='назад к регистрации'
          navigatePath='/registration'
          callback={refreshRegister}
        />
      ) : errorStatus && errorStatus !== 400 ? (
        <Modal
          title='Данные не сохранились'
          text='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
          buttonText='повторить'
          callback={repeatRegister}
        />
      ) : (
        <>
          <h1 className='compony-title'>Books</h1>
          <form data-test-id='register-form' className='register-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='register-form-topper'>
              <h2 className='register-form-title'>Регистрация</h2>
              <p className='register-form-counter'>{stepCounter} шаг из 3</p>
            </div>
            {stepCounter === 1 ? (
              <>
                <div className='register-form-item'>
                  <FormInput
                    type='text'
                    name='username'
                    register={register}
                    placeholder='Придумайте логин для входа'
                    validationSchema={{
                      required: 'Поле не может быть пустым',
                    }}
                    errors={errors}
                  />
                  <p className='register-form-clue'>Используйте для логина латинский алфавит и цифры</p>
                </div>
                <div className='register-password'>
                  <div className='register-form-item'>
                    <FormInput
                      type={passwordVisible ? 'text' : 'password'}
                      name='password'
                      register={register}
                      placeholder='Пароль'
                      setInputFilled={setInputFilled}
                      validationSchema={{
                        required: 'Поле не может быть пустым',
                        pattern: '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?!.*s).*$',
                        minLength: 8,
                      }}
                      errors={errors}
                    />
                    <p className='register-form-clue'>
                      Пароль
                      <span className={classNames({ active: errors?.password?.type === 'minLength' })}>
                        не менее 8 символов,
                      </span>
                      <span>с заглавной буквой</span>
                      <span>и цифрой</span>
                    </p>
                  </div>
                  <button
                    className={classNames('register-password-button', { visible: inputFilled })}
                    type='button'
                    onClick={() => setPasswordVisible((prevState) => !prevState)}
                  >
                    <Icon src={passwordVisible ? passOpened : passClosed} alt='passView' />
                  </button>
                </div>
                <button
                  type='button'
                  className='register-form-button'
                  onClick={() => setStepCounter((prevState) => prevState + 1)}
                >
                  Следующий шаг
                </button>
              </>
            ) : stepCounter === 2 ? (
              <div>
                <div className='register-form-item '>
                  <FormInput
                    type='text'
                    name='firstName'
                    register={register}
                    placeholder='Имя'
                    validationSchema={{
                      required: 'Поле не может быть пустым',
                    }}
                    errors={errors}
                  />
                </div>
                <div className='register-form-item'>
                  <FormInput
                    type='text'
                    name='lastName'
                    register={register}
                    placeholder='Фамилия'
                    validationSchema={{
                      required: 'Поле не может быть пустым',
                    }}
                    errors={errors}
                  />
                </div>
                <button
                  type='button'
                  className='register-form-button'
                  onClick={() => setStepCounter((prevState) => prevState + 1)}
                >
                  Последний шаг
                </button>
              </div>
            ) : stepCounter === 3 ? (
              <>
                <div className='register-form-item'>
                  <FormInput
                    type='text'
                    name='phone'
                    register={register}
                    placeholder='Номер телефона'
                    validationSchema={{
                      required: 'Поле не может быть пустым',
                    }}
                    errors={errors}
                  />
                </div>
                <div className='register-form-item'>
                  <FormInput
                    type='text'
                    name='email'
                    register={register}
                    placeholder='E-mail'
                    validationSchema={{
                      required: 'Поле не может быть пустым',
                    }}
                    errors={errors}
                  />
                </div>
                <input type='submit' className='register-form-button' value='Отправить' />
              </>
            ) : null}
            <div className='auth-register'>
              <p className='auth-register-text'>Есть учётная запись?</p>
              <Link className='auth-register-link' to='/auth'>
                войти
                <Icon src={arrow} alt='arrow' />
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
