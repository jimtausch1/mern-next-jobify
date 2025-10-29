'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { checkDefaultTheme } from '../utils/checkTheme';
import { customFetch } from '../utils/customFetch';
import { DashboardContext } from './DashboardContext';

type DashboardProviderProps = {
  children: React.ReactNode | string;
};

const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch.get<UserModel>('/users/current-user');
    return data;
  },
};

export default function DashboardProvider({ children }: DashboardProviderProps) {
  const [isAuthError, setIsAuthError] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const user = useQuery(userQuery).data ?? ({} as UserModel);
  const queryClient = useQueryClient();
  const router = useRouter();

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    const darkThemeSetting = newDarkTheme ? 'true' : 'false';
    localStorage.setItem('darkTheme', darkThemeSetting);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = useCallback(async () => {
    await signOut();
    router.push('/');
    queryClient.invalidateQueries();
    toast.success('Logging out...');
  }, [router, queryClient]);

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError, logoutUser]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      {' '}
      {children}{' '}
    </DashboardContext.Provider>
  );
}
