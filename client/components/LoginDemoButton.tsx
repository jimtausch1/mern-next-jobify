'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LoginDemoButton() {
  const router = useRouter();

  const loginDemoUser = async () => {
    try {
      await signIn('credentials', {
        email: 'test1@test.com',
        password: 'secret123',
        redirect: false,
      });

      toast.success('Take a test drive');
      router.push('/dashboard');
    } catch (err: unknown) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <button type="button" className="btn btn-block" onClick={loginDemoUser}>
      explore the app
    </button>
  );
}
