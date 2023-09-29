import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './form-input.scss';

export function FormInput(props) {
  const { type, name, register, placeholder, validationSchema, setInputFilled, errors } = props;

  const [inputValue, setInputValue] = useState('');
  const onChange = (e) => {
    setInputValue(e.target.value);
    if (setInputFilled) {
      setInputFilled(e.target.value.length > 0);
    }
  };

  return (
    <React.Fragment>
      <div className='form-field'>
        <input
          autoComplete='on'
          type={type}
          className='form-field-input'
          {...register(name, {
            ...validationSchema,
            onChange: (e) => onChange(e),
          })}
        />
        <span className={classNames('form-field-placeholder', { raised: inputValue.length > 0 })}>{placeholder}</span>
      </div>
      {errors?.[name] && <p className='form-field-error'>{errors?.[name].message}</p>}
    </React.Fragment>
  );
}
