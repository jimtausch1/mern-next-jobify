'use client';

import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { customFetch } from '../utils/customFetch';

const loginDemoUser = async () => {
  const data = {
    email: 'test1@test.com',
    password: 'secret123',
  };
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Take a test drive');
    redirect('/dashboard');
  } catch {
    // toast.error(error?.response?.data?.msg);
  }
};

export default function LoginDemoButton() {
  return (
    <button type="button" className="btn btn-block" onClick={loginDemoUser}>
      explore the app
    </button>
  );
}
