import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/auth/auth-slice';
import { useLoginUserMutation } from '../../store/auth/auth-api-slice';
import './auth-page.scss';

import arrow from '../../assets/images/arrow.svg';
import passClosed from '../../assets/images/passwordClosed.svg';
import passOpened from '../../assets/images/passwordOpened.svg';

import { Icon } from '../../components/icon/icon';
import { FormInput } from '../../components/form-input/form-input';
import { Modal } from '../../components/modal/modal';

export function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const [errorStatus, setErrorStatus] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputFilled, setInputFilled] = useState(false);

  const [loginUser] = useLoginUserMutation();

  const onSubmit = async (data) => {
    try {
      const userData = await loginUser({ ...data }).unwrap();
      dispatch(setCredentials({ ...userData }));
    } catch (error) {
      setErrorStatus(error.status);
    }
  };

  return (
    <div className='auth' data-test-id='auth'>
      {errorStatus && errorStatus !== 400 ? (
        <Modal title='Вход не выполнен' text='Что-то пошло не так. Попробуйте ещё раз' />
      ) : (
        <>
          <h1 className='compony-title'>Cleverland</h1>
          <form
            data-test-id='auth-form'
            className={classNames('auth-form', { errored: errorStatus === 400 })}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className='auth-form-title'>Вход в личный кабинет</h2>
            <FormInput
              type='text'
              name='identifier'
              register={register}
              placeholder='Логин'
              validationSchema={{
                required: 'Поле не может быть пустым',
              }}
              errors={errors}
            />
            <div className='auth-password'>
              <FormInput
                type={passwordVisible ? 'text' : 'password'}
                name='password'
                register={register}
                placeholder='Пароль'
                setInputFilled={setInputFilled}
                validationSchema={{
                  required: 'Поле не может быть пустым',
                }}
                errors={errors}
              />
              <button
                className={classNames('auth-password-button', { visible: inputFilled })}
                type='button'
                onClick={() => setPasswordVisible((prevState) => !prevState)}
              >
                <Icon
                  data-test-id={passwordVisible ? 'eye-opened' : 'eye-closed'}
                  src={passwordVisible ? passOpened : passClosed}
                  alt='passView'
                />
              </button>
            </div>
            {errorStatus === 400 ? (
              <div className='auth-restore'>
                <p className='auth-restore-text'>Неверный логин или пароль!</p>
                <Link to='/forgot-pass' className='auth-restore-link'>
                  Восстановить?
                </Link>
              </div>
            ) : (
              <Link className='auth-form-forgot' to='/forgot-pass'>
                Забыли логин или пароль?
              </Link>
            )}
            <input type='submit' className='auth-form-submit' value='Вход' />
            <div className='auth-register'>
              <p className='auth-register-text'>Нет учётной записи?</p>
              <Link className='auth-register-link' to='/registration'>
                Регистрация
                <Icon src={arrow} alt='arrow' />
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
