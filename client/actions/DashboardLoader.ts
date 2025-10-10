import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';
import { customFetch } from '../utils/customFetch';

export const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch.get('/users/current-user');
    return data;
  },
};

export const loader = (queryClient: QueryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch {
    return redirect('/');
  }
};
