'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';

type AllJobsContextValues = {
  searchParams: SearchParams;
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
  data: [],
});

export const useAllJobsContext = () => useContext(AllJobsContext);
