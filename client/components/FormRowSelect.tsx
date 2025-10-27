'use client';

import { ChangeEvent } from 'react';
import { RefCallBack } from 'react-hook-form';

type FormRowSelectProps = {
  ref: RefCallBack;
  name: string;
  labelText?: string;
  list: string[];
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export default function FormRowSelect({
  ref,
  name,
  labelText,
  list,
  defaultValue = '',
  onChange,
  ...props
}: FormRowSelectProps) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        ref={ref}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
        {...props}
      >
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}
