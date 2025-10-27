'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';

type AllJobsContextValues = {
  searchParams: SearchParams;
  isLoading: boolean;
  data: any;
};

export const AllJobsContext = createContext<AllJobsContextValues>({
  searchParams: {
    search: '',
    jobStatus: 'all',
    jobType: 'all',
    sort: 'newest',
    page: '1',
  },
  isLoading: false,
  data: [],
});

export const useAllJobsContext = () => useContext(AllJobsContext);
