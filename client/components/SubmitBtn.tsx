'use client';

import { useFormStatus } from 'react-dom';

type SubmitBtnProps = {
  formBtn?: boolean;
};

export default function SubmitBtn({ formBtn }: SubmitBtnProps) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={`btn btn-block ${formBtn && 'form-btn'} `} disabled={pending}>
      {pending ? 'submitting' : 'submit'}
    </button>
  );
}
