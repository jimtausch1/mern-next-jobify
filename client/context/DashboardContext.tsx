'use client';

import { createContext, useContext } from 'react';

type DashboardContextValues = {
  user: UserModel;
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => void;
};

export const DashboardContext = createContext<DashboardContextValues>({
  user: {} as UserModel,
  showSidebar: false,
  isDarkTheme: false,
  toggleDarkTheme: () => {},
  toggleSidebar: () => {},
  logoutUser: () => {},
});

export const useDashboardContext = () => useContext(DashboardContext);
