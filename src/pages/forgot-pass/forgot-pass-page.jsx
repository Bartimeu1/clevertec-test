import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSendLetterMutation, useRestorePassMutation } from '../../store/restore/restore.api';
import './forgot-pass-page.scss';

import arrow from '../../assets/images/arrowGrey.svg';

import { Icon } from '../../components/icon/icon';
import { FormInput } from '../../components/form-input/form-input';
import { Modal } from '../../components/modal/modal';

export function ForgotPassPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
  });

  // Get code from url params
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const [sendLetter] = useSendLetterMutation();
  const [restorePass] = useRestorePassMutation();

  const [errorMessage, setErrorMessage] = useState(null);
  const [successSendLetter, setSuccessSendLetter] = useState(null);
  const [successRestore, setSuccessRestore] = useState(null);

  const onSubmit = async (data) => {
    if (!code) {
      try {
        await sendLetter({ ...data }).unwrap();
        setSuccessSendLetter(true);
      } catch (error) {
        setSuccessSendLetter(false);
      }
    } else {
      try {
        await restorePass({ ...data, code }).unwrap();
        setSuccessRestore(true);
      } catch (error) {
        setSuccessRestore(false);
      }
    }
  };
  console.log(errors);

  return (
    <div className='forgot' data-test-id={code ? 'reset-password-form' : 'send-email-form'}>
      {successSendLetter ? (
        <Modal
          title='Письмо выслано'
          text='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
        />
      ) : successRestore ? (
        <Modal
          title='Новые данные сохранены'
          text='Зайдите в личный кабинет, используя свои логин и новый пароль'
          buttonText='вход'
          navigatePath='/auth'
        />
      ) : (
        <>
          <h1 className='compony-title'>Cleverland</h1>
          {!code && (
            <div className='forgot-return'>
              <Link to='/auth' className='forgot-return-link'>
                <Icon src={arrow} alt='arrow' />
                вход в личный кабинет
              </Link>
            </div>
          )}
          <form className='forgot-form' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='auth-form-title'>Восстановление пароля</h2>
            {!code ? (
              <React.Fragment>
                <div className='register-form-item'>
                  <FormInput
                    type='text'
                    name='email'
                    register={register}
                    placeholder='Email'
                    validationSchema={{
                      required: 'Поле не может быть пустым',
                    }}
                  />
                  {errorMessage && <p className='forgot-error'>{errorMessage}</p>}
                  <p className='register-form-clue'>
                    На этот email будет отправлено письмо с инструкциями по восстановлению пароля
                  </p>
                </div>
                <input type='submit' className='register-form-button' value='восстановить' />
                <div className='auth-register'>
                  <p className='auth-register-text'>Нет учётной записи?</p>
                  <Link className='auth-register-link' to='/registration'>
                    Регистрация
                  </Link>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className='forgot-form-item'>
                  <FormInput
                    type='text'
                    name='password'
                    register={register}
                    placeholder='Новый пароль'
                    validationSchema={{
                      required: 'Поле не может быть пустым',
                    }}
                  />
                  <p className='register-form-clue'>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
                </div>
                <div className='forgot-form-item'>
                  <FormInput
                    type='text'
                    name='passwordConfirmation'
                    register={register}
                    placeholder='Повторите пароль'
                    validationSchema={{
                      required: true,
                    }}
                  />
                </div>
                <input type='submit' className='register-form-button' value='сохранить изменения' />
                <p className='auth-register-text'>После сохранения войдите в библиотеку, используя новый пароль</p>
              </React.Fragment>
            )}
          </form>
        </>
      )}
    </div>
  );
}
