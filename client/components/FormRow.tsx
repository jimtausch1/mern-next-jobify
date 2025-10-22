'use client';

import { ChangeEvent, useRef } from 'react';

type FormRowProps = {
  type: string;
  name: string;
  labelText?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function FormRow({ type, name, labelText, defaultValue, onChange }: FormRowProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  if (inputRef && inputRef.current) {
    inputRef.current.value = defaultValue ?? '';
  }

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        ref={inputRef}
        className="form-input"
        defaultValue={defaultValue || ''}
        onChange={onChange}
        // required
      />
    </div>
  );
}
