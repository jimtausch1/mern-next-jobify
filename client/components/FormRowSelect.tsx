'use client';

import { ChangeEvent, useRef } from 'react';

type FormRowSelectProps = {
  name: string;
  labelText?: string;
  list: string[];
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export default function FormRowSelect({
  name,
  labelText,
  list,
  defaultValue = '',
  onChange,
}: FormRowSelectProps) {
  const selectRef = useRef<HTMLSelectElement>(null);
  if (selectRef && selectRef.current) {
    selectRef.current.value = defaultValue;
  }

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        ref={selectRef}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
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
