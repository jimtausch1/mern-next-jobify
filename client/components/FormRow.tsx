'use client';

import { ChangeEvent } from 'react';
import { FieldError, RefCallBack } from 'react-hook-form';

type FormRowProps = {
  ref: RefCallBack;
  type: string;
  name: string;
  labelText?: string;
  defaultValue?: string;
  error: FieldError;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function FormRow({
  ref,
  type,
  name,
  labelText,
  defaultValue,
  error,
  onChange,
  ...props
}: FormRowProps) {
  return (
    <div className={!error ? 'form-row' : ''}>
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        ref={ref}
        className="form-input"
        defaultValue={defaultValue || ''}
        onChange={onChange}
        {...props}

        // required
      />
      {error && <span style={{ color: 'red', fontSize: '0.8em' }}>{error.message}</span>}
    </div>
  );
}
