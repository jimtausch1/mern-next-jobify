'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllJobsContext } from './AllJobsContext';

type AllJobsProviderProps = {
  children: React.ReactNode | string;
  searchParams: SearchParams;
  data: AllJobsResponse;
  isLoading: boolean;
};

export function AllJobsProvider({ children, searchParams, data, isLoading }: AllJobsProviderProps) {
  // const { search, jobStatus, jobType, sort, page } = searchParams;

  return (
    <AllJobsContext.Provider value={{ searchParams, data, isLoading }}>
      {children}
    </AllJobsContext.Provider>
  );
}
