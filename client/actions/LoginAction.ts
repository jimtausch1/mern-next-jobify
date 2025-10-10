// import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { customFetch } from '../utils/customFetch';

const LoginAction = async (formData: FormData) => {
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post('/auth/login', data);
    // queryClient.invalidateQueries();
    toast.success('Login successful');
    return response.data;
  } catch (error: any) {
    // toast.error(error?.response?.data?.msg);
    return error;
  }
};

export default LoginAction;
