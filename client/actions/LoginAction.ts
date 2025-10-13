'use server';

// import { QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { customFetch } from '../utils/customFetch';

const LoginAction = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post('/auth/login', data);
    if (response.status === 200) {
      const nextjsCookies = await cookies();
      nextjsCookies.set('next-auth.session-token', response.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        sameSite: 'strict',
        path: '/',
      });
    }
    // queryClient.invalidateQueries();
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export default LoginAction;
